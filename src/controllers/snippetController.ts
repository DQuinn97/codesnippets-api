import { Request, Response } from "express";
import { Snippet } from "../models/SnippetModel";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

export const getSnippets = async (req: Request, res: Response) => {
  try {
    const snippets = await Snippet.find();
    res.status(200).json(snippets);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const addSnippets = async (req: Request, res: Response) => {
  try {
    const { title, code, language, tags } = req.body;
    let encoded = code;
    const snippet = await Snippet.create({
      title,
      code: encoded,
      language,
      tags,
    });
    res.status(201).json(snippet);
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const updateSnippet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { task, done } = req.body;
    const todo = await Snippet.findByIdAndUpdate(
      id,
      { task, done },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
