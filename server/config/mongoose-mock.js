const { ObjectId } = require("mongodb");
const { getDB } = require("./db");

class BaseModel {
  constructor(collectionName, schema, data) {
    this._collectionName = collectionName;
    this._schema = schema;

    // Copy data onto the instance
    Object.assign(this, data);

    // Store copy of original data to check isModified()
    this._original = data ? { ...data } : {};

    // Copy instance methods from schema.methods to this instance
    if (schema && schema.methods) {
      for (const [name, fn] of Object.entries(schema.methods)) {
        this[name] = fn.bind(this);
      }
    }
  }

  isModified(field) {
    if (!this._original || !this._original._id) {
      return true;
    }
    return this[field] !== this._original[field];
  }

  static get collection() {
    return getDB().collection(this.collectionName);
  }

  static _toObjectId(id) {
    if (!id) return null;
    if (id instanceof ObjectId) return id;
    if (typeof id === "string" && id.length === 24) {
      try {
        return new ObjectId(id);
      } catch (e) {
        return id;
      }
    }
    return id;
  }

  static find(filter = {}) {
    const processedFilter = { ...filter };
    if (processedFilter._id) processedFilter._id = this._toObjectId(processedFilter._id);
    if (processedFilter.createdBy) processedFilter.createdBy = this._toObjectId(processedFilter.createdBy);

    // Default projection: exclude password from users collection
    const options = {};
    if (this.collectionName === "users") {
      options.projection = { password: 0 };
    }

    const cursor = this.collection.find(processedFilter, options);

    const chain = {
      sort: (sortOptions) => {
        cursor.sort(sortOptions);
        return chain;
      },
      then: (resolve, reject) => {
        cursor.toArray()
          .then(docs => {
            resolve(docs.map(doc => new this(doc)));
          })
          .catch(err => {
            reject(err);
          });
      }
    };
    Object.setPrototypeOf(chain, Promise.prototype);
    return chain;
  }

  static findOne(filter = {}) {
    const processedFilter = { ...filter };
    if (processedFilter._id) processedFilter._id = this._toObjectId(processedFilter._id);
    if (processedFilter.createdBy) processedFilter.createdBy = this._toObjectId(processedFilter.createdBy);

    let selectFields = "";
    const chain = {
      select: (fields) => {
        selectFields = fields;
        return chain;
      },
      then: (resolve, reject) => {
        const options = {};
        if (this.collectionName === "users" && !selectFields.includes("+password")) {
          options.projection = { password: 0 };
        }
        this.collection.findOne(processedFilter, options)
          .then(doc => {
            resolve(doc ? new this(doc) : null);
          })
          .catch(err => {
            reject(err);
          });
      }
    };
    Object.setPrototypeOf(chain, Promise.prototype);
    return chain;
  }

  static async findById(id) {
    if (!id) return null;
    const doc = await this.collection.findOne({ _id: this._toObjectId(id) });
    return doc ? new this(doc) : null;
  }

  static async create(data) {
    if (Array.isArray(data)) {
      const instances = [];
      for (const d of data) {
        const inst = new this(d);
        await inst.save();
        instances.push(inst);
      }
      return instances;
    }

    const instance = new this(data);
    await instance.save();
    return instance;
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    const doc = await this.findById(id);
    if (!doc) return null;

    // Apply updates
    Object.assign(doc, update);
    await doc.save();
    return doc;
  }

  static async findByIdAndDelete(id) {
    const doc = await this.findById(id);
    if (doc) {
      await doc.deleteOne();
    }
    return doc;
  }

  static async countDocuments(filter = {}) {
    const processedFilter = { ...filter };
    if (processedFilter._id) processedFilter._id = this._toObjectId(processedFilter._id);
    if (processedFilter.createdBy) processedFilter.createdBy = this._toObjectId(processedFilter.createdBy);
    return this.collection.countDocuments(processedFilter);
  }

  async save() {
    // Run pre-save hooks sequentially if defined
    if (this._schema && this._schema.hooks && this._schema.hooks.preSave) {
      for (const hook of this._schema.hooks.preSave) {
        let nextCalled = false;
        const next = () => { nextCalled = true; };
        await hook.call(this, next);
      }
    }

    const collection = getDB().collection(this._collectionName);
    const data = { ...this };

    // Strip helper properties
    delete data._collectionName;
    delete data._schema;
    delete data._original;

    // Strip bound instance methods
    if (this._schema && this._schema.methods) {
      for (const name of Object.keys(this._schema.methods)) {
        delete data[name];
      }
    }

    const id = data._id;
    delete data._id;

    // Convert reference IDs to ObjectId
    if (data.createdBy) data.createdBy = BaseModel._toObjectId(data.createdBy);

    // Timestamps support
    const now = new Date();
    if (!id) {
      data.createdAt = now;
      data.updatedAt = now;
      const result = await collection.insertOne(data);
      this._id = result.insertedId;
    } else {
      data.updatedAt = now;
      await collection.updateOne({ _id: BaseModel._toObjectId(id) }, { $set: data });
    }

    // Refresh original
    this._original = { ...data, _id: this._id };
    return this;
  }

  async deleteOne() {
    const collection = getDB().collection(this._collectionName);
    if (this._id) {
      await collection.deleteOne({ _id: BaseModel._toObjectId(this._id) });
    }
  }
}

class Schema {
  constructor(definition, options) {
    this.definition = definition;
    this.options = options;
    this.methods = {};
    this.hooks = {
      preSave: []
    };
  }

  pre(hookName, fn) {
    if (hookName === "save") {
      this.hooks.preSave.push(fn);
    }
  }
}

Schema.Types = {
  ObjectId: ObjectId
};

const mongooseMock = {
  Schema: Schema,
  model: (modelName, schema) => {
    const collectionName = modelName.toLowerCase() + "s";
    return class extends BaseModel {
      static get collectionName() {
        return collectionName;
      }
      constructor(data) {
        super(collectionName, schema, data);
      }
    };
  },
  Types: {
    ObjectId: ObjectId
  }
};

module.exports = mongooseMock;
