import express from "express";
import {
  getSnippets,
  getSnippetById,
  addSnippet,
} from "../controllers/snippetController";

const router = express.Router();

router.get("/", getSnippets).get("/:id", getSnippetById).post("/", addSnippet);

export default router;
