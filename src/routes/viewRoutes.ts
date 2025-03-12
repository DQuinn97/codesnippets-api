import express from "express";
import { renderIndex } from "../controllers/viewController";

const router = express.Router();

router.get("/", renderIndex);

export default router;
