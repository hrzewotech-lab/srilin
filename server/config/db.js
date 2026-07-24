const { MongoClient } = require("mongodb");
const { AsyncLocalStorage } = require("async_hooks");

const dbStorage = new AsyncLocalStorage();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI environment variable is missing");
  }

  // Initialize MongoClient with single connection pool to prevent exhaustion
  const client = new MongoClient(uri, {
    maxPoolSize: 1,
    minPoolSize: 0,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 10000,
  });
  await client.connect();

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
