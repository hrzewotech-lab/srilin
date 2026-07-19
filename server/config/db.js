const { MongoClient } = require("mongodb");

let client = null;
let db = null;

const connectDB = async () => {
  if (db) return db;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI environment variable is missing");
  }

  // Initialize MongoClient
  client = new MongoClient(uri, {
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

  db = client.db(dbName || "srilin");
  console.log(`MongoDB Connected (Native): ${db.databaseName}`);
  return db;
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};

module.exports = { connectDB, getDB };
