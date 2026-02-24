import express from "express";
import {
  createCollection,
  getCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
  getCollectionProducts
} from "../controllers/collection.controller.js";

const router = express.Router();

router.post("/", createCollection);
router.get("/", getCollections);
router.get("/:id", getCollectionById);
router.put("/:id", updateCollection);
router.delete("/:id", deleteCollection);
router.get("/get-collection-products/:id", getCollectionProducts);
export default router;
