import { MongoClient } from "mongodb";

const connString = process.env.MONGODB_STRING || "mongodb://localhost:27017";

export const connectDB = async () => {
  let client;
  try {
    client = await MongoClient.connect(connString);
    console.info("Database connected!");
  } catch (error) {
    console.error("Something went wrong! Error: ", error);
  }
  return client;
};
