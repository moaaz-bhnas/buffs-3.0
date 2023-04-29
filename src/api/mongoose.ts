import { CachedConnection } from "@/interfaces/mongoose/CachedConnection";
import mongoose, { ConnectOptions, Mongoose } from "mongoose";

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable in Doppler"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cachedConnection: CachedConnection = global.mongoose;

if (!cachedConnection) {
  cachedConnection = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  if (!cachedConnection.promise) {
    const opts: ConnectOptions = {
      /**
       * All collection actions (insert, remove, queries, etc.) are queued until Mongoose successfully connects to MongoDB. It is likely you haven't called Mongoose's connect() or createConnection() function yet.
       * In Mongoose 5.11, there is a bufferTimeoutMS option (set to 10000 by default) that configures how long Mongoose will allow an operation to stay buffered before throwing an error.
       * If you want to opt out of Mongoose's buffering mechanism across your entire application, set the global bufferCommands option to false.
       */
      bufferCommands: false,
    };

    cachedConnection.promise = mongoose
      .connect(DATABASE_URL, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cachedConnection.conn = await cachedConnection.promise;
  } catch (error) {
    cachedConnection.promise = null;
    throw error;
  }

  return cachedConnection.conn;
}

export default dbConnect;
