import express from "express";
import {
  getSnippets,
  getSnippetById,
  addSnippet,
  updateSnippet,
  deleteSnippet,
} from "../controllers/snippetController";

const router = express.Router();

router
  .get("/", getSnippets)
  .get("/:id", getSnippetById)
  .post("/", addSnippet)
  .put("/:id", updateSnippet)
  .delete("/:id", deleteSnippet);

export default router;
