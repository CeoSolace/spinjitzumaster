import mongoose from "mongoose";

// Extend the NodeJS global type to store a cached connection.
declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: any;
}

/**
 * Connect to MongoDB using Mongoose. Uses a global cached connection to
 * prevent creating multiple connections in development or when hot reloading.
 */
export async function connectDB() {
  if (global.mongooseConnection && global.mongooseConnection.conn) {
    return global.mongooseConnection.conn;
  }
  if (!global.mongooseConnection) {
    global.mongooseConnection = { conn: null, promise: null };
  }
  if (!global.mongooseConnection.promise) {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    global.mongooseConnection.promise = mongoose.connect(uri).then((mongoose) => mongoose);
  }
  global.mongooseConnection.conn = await global.mongooseConnection.promise;
  return global.mongooseConnection.conn;
}