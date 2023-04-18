export interface cachedConnection {
  promise: Promise<Mongoose> | null;
  conn: Mongoose | null;
}
