import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;
import { getSnippetsRAW } from "./snippetController";

export const renderIndex = async (req: Request, res: Response) => {
  try {
    const snippets = await getSnippetsRAW();
    res.render("index", { snippets });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
