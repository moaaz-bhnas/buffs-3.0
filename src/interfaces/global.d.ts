import { Mongoose } from "mongoose";
import { CachedConnection } from "./mongoose/CachedConnection";
import { MongoClient } from "mongodb";

/* eslint-disable no-var */

declare global {
  var mongoose: CachedConnection;
  var _mongoClientPromise: Promise<MongoClient>;
}
