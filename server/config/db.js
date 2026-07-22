const { MongoClient } = require("mongodb");
const { AsyncLocalStorage } = require("async_hooks");

const dbStorage = new AsyncLocalStorage();

let cachedClient = null;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI environment variable is missing");
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 1,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    });
    await cachedClient.connect();
    console.log("MongoDB connected");
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
