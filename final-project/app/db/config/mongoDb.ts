import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGO_URI as string); // typecasting

export const database = client.db("final-project");
