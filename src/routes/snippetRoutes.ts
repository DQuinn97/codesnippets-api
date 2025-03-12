import express from "express";
import { getSnippets, getSnippetById } from "../controllers/snippetController";

const router = express.Router();

router.get("/", getSnippets).get("/:id", getSnippetById);

export default router;
