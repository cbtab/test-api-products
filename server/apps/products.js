import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const getProducts = await collection.find({}).limit(10).toArray();

    return res.json({
      data: getProducts,
    });
  } catch (error) {
    console.log(error);
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const collection = db.collection("products");
    const getProducts = await collection.findOne({
      _id: id,
    });

    return res.json({
      data: getProducts,
    });
  } catch (error) {
    console.log(error);
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const newProducts = { ...req.body };
    const result = await collection.insertOne(newProducts);

    return res.json({
      message: "Product has been created successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const collection = db.collection("products");
    const updatedProduct = { ...req.body };
    await collection.updateOne({ _id: id }, { $set: updatedProduct });

    return res.json({
      message: "Product has been updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const collection = db.collection("products");
    await collection.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
});

export default productRouter;
