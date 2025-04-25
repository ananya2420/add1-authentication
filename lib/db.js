import { MongoClient } from 'mongodb';

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to persist the MongoClient connection across hot reloads.
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(
      "mongodb+srv://maximilian:NqVMJADYUGvUCAxq@cluster0.mwhfzre.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, connect normally (this doesn't persist across hot reloads).
  clientPromise = MongoClient.connect(
    "mongodb+srv://maximilian:NqVMJADYUGvUCAxq@cluster0.mwhfzre.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
}

export async function connectToDatabase() {
  const client = await clientPromise;
  return client;
}
