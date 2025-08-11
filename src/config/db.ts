import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("FATAL ERROR: MONGODB_URI is not defined in .env file");
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI);
let db: Db;

export const connectToServer = async () => {
  try {
    await client.connect();
    db = client.db("moventrac_db");
    console.log("Successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    await client.close();
    process.exit(1);
  }
};

export const getDb = () => {
  return db;
};
