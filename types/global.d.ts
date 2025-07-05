import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Required to make this a module and avoid redeclaration errors
export {};
# refresh 1751729895
