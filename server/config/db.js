const { MongoClient } = require("mongodb");
const { AsyncLocalStorage } = require("async_hooks");

const dbStorage = new AsyncLocalStorage();

let cachedClient = null;
let connectionPromise = null;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI environment variable is missing");
  }

  if (!cachedClient) {
    if (!connectionPromise) {
      const client = new MongoClient(uri, {
        maxPoolSize: 1,
        minPoolSize: 1,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        socketTimeoutMS: 10000,
      });
      connectionPromise = client.connect().then(() => {
        console.log("MongoDB connected");
        cachedClient = client;
        return client;
      }).catch(err => {
        connectionPromise = null;
        throw err;
      });
    }
    await connectionPromise;
  }

  const client = cachedClient;

  // Extract database name from URI or use default
  let dbName = undefined;
  try {
    const url = new URL(uri.replace("mongodb+srv://", "http://").replace("mongodb://", "http://"));
    dbName = url.pathname.replace("/", "");
  } catch (e) {
    const match = uri.match(/\/([a-zA-Z0-9_-]+)(?:\?|$)/);
    dbName = match ? match[1] : undefined;
  }

  const db = client.db(dbName || "srilin");
  return { client, db };
};

const getDB = () => {
  const store = dbStorage.getStore();
  if (!store || !store.db) {
    throw new Error("Database not initialized for this request context.");
  }
  return store.db;
};

module.exports = { connectDB, getDB, dbStorage };
