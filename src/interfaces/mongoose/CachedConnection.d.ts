export interface CachedConnection {
  promise: Promise<Mongoose> | null;
  conn: Mongoose | null;
}
