// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, MongoClientOptions } from "mongodb";

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable in Doppler"
  );
}

const options: MongoClientOptions = {};

let mongoClient: MongoClient;
let mongoClientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    mongoClient = new MongoClient(DATABASE_URL, options);
    global._mongoClientPromise = mongoClient.connect();
  }
  mongoClientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  mongoClient = new MongoClient(DATABASE_URL, options);
  mongoClientPromise = mongoClient.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default mongoClientPromise;
