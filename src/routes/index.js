import express from "express";
import { ObjectId } from "mongodb";

import { connectDB } from "../database/dbConfig.js";

const router = express.Router();

// API to get all users
router.get("/users", async (req, res) => {
  //-----------------------------------------//
  const client = await connectDB();
  const dbo = client.db("test_db");
  //const usersCollection = await dbo.createCollection("users");
  const users = await dbo.collection("users").find({}).toArray();
  client.close();
  //----------------------------------------//

  return res.send({
    status: true,
    message: "Users retrieved successfully!",
    data: { users },
  });
});

// API to get a single user by ID
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  //-----------------------------------------//
  const client = await connectDB();
  const dbo = client.db("test_db");

  const user = await dbo.collection("users").findOne({ _id: new ObjectId(id) });
  if (!user) {
    return res.status(200).send({ status: false, message: "User not found!" });
  }

  client.close();
  //----------------------------------------//

  return res.send({
    status: true,
    message: "Users retrieved successfully!",
    data: { user },
  });
});

// API to update a user by ID
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;

  //-----------------------------------------//
  const client = await connectDB();
  const dbo = client.db("test_db");

  const user = await dbo.collection("users").findOne({ _id: new ObjectId(id) });
  if (!user) {
    return res.status(200).send({ status: false, message: "User not found!" });
  }

  const result = await dbo.collection("users").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: req.body,
    }
  );
  client.close();
  //----------------------------------------//

  if (result.acknowledged) {
    return res.send({
      status: true,
      message: "User updated successfully!",
      data: {
        id: result.insertedId,
      },
    });
  } else {
    return res
      .status(400)
      .send({ status: true, message: "Something went wrong!" });
  }
});

// API to delete a user by ID
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  //-----------------------------------------//
  const client = await connectDB();
  const dbo = client.db("test_db");

  const user = await dbo.collection("users").findOne({ _id: new ObjectId(id) });
  if (!user) {
    return res.status(200).send({ status: false, message: "User not found!" });
  }

  const result = await dbo
    .collection("users")
    .deleteOne({ _id: new ObjectId(id) });

  client.close();
  //----------------------------------------//

  if (result.deletedCount > 0) {
    return res.send({
      status: true,
      message: "User deleted successfully!",
      data: {
        id: result.insertedId,
      },
    });
  } else {
    return res
      .status(400)
      .send({ status: true, message: "Something went wrong!" });
  }
});

// API to add a new user
router.post("/users", async (req, res) => {
  //const { name } = req.body;
  const user = req.body;

  //-----------------------------------------//
  const client = await connectDB();
  const dbo = client.db("test_db");
  const result = await dbo.collection("users").insertOne(user);
  client.close();
  //----------------------------------------//

  if (result.acknowledged) {
    return res.send({
      status: true,
      message: "User added successfully!",
      data: {
        id: result.insertedId,
      },
    });
  } else {
    return res
      .status(400)
      .send({ status: true, message: "Something went wrong!" });
  }
});

router.get("/", (req, res) => {
  return res.send({ status: true, message: "Welcome!" });
});

export default router;
