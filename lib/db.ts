import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Extend global type
declare global {
  let mongooseCache: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

// Use globalThis to store the cache
const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
};

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = {
    conn: null,
    promise: null,
  };
}

const cached = globalWithMongoose.mongooseCache;

async function dbConnect(): Promise<Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
# refresh 1751729907
