import { Mongoose } from "mongoose";
import { cachedConnection } from "./mongoose/cachedConnection";
import { MongoClient } from "mongodb";

/* eslint-disable no-var */

declare global {
  var mongoose: cachedConnection;
  var _mongoClientPromise: Promise<MongoClient>;
}
