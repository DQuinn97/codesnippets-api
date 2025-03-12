import { Request, Response } from "express";
import { Snippet } from "../models/SnippetModel";
import { Error as MongooseError, SortOrder } from "mongoose";
import { formatSnippet } from "../helpers";
import { SnippetType } from "../types";
const { ValidationError } = MongooseError;

export const getSnippets = async (req: Request, res: Response) => {
  try {
    const { language, tags, limit, page, sort, order } = req.query;

    const filter = {} as {
      language: Object | undefined;
      tags: Object | undefined;
    };
    if (language) {
      let languageFilter = language as string;
      filter.language = { $regex: languageFilter, $options: "i" };
    }
    console.log(language, filter);
    if (tags) filter.tags = { $in: (tags as string).split(",") };
    const query = Snippet.find(filter);
    if (limit) {
      if (page) query.skip(+page * +limit);
      query.limit(+limit);
    }
    if (sort) {
      let sorted = [sort, "asc"] as [string, SortOrder];
      if (order) sorted[1] = order as SortOrder;
      query.sort([sorted]);
    }
    const snippets = await query.exec();

    let output = snippets
      .map((snippet) => snippet.toObject())
      .map((snippet) => {
        return {
          ...snippet,
          code: Buffer.from(snippet.code, "base64").toString("utf-8"),
        };
      });

    res.status(200).json(output);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
export const getSnippetsRAW = async () => {
  try {
    const snippets = await Snippet.find();
    let output = snippets
      .map((snippet) => snippet.toObject())
      .map((snippet) => {
        return {
          ...snippet,
          code: Buffer.from(snippet.code, "base64").toString("utf-8"),
        };
      })
      .filter(
        (snippet) =>
          snippet.expiresIn == null || snippet.expiresIn.getTime() > Date.now()
      );
    return output;
  } catch (error: unknown) {
    if (error) return null;
  }
};
export const getSnippetById = async (req: Request, res: Response) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (
      snippet &&
      snippet.expiresIn &&
      snippet.expiresIn?.getTime() < Date.now()
    ) {
      res.status(404).json({ message: "Snippet not found" });
      return;
    }
    res.status(200).json(snippet);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const addSnippet = async (req: Request, res: Response) => {
  try {
    const { title, code, language, tags, expiresIn } = req.body;

    const formattedSnippet = formatSnippet({
      title,
      code,
      language,
      tags,
      expiresIn,
    } as SnippetType);
    const snippet = await Snippet.create(formattedSnippet);
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
    const { title, code, language, tags, expiresIn } = req.body;
    const formattedSnippet = formatSnippet({
      title,
      code,
      language,
      tags,
      expiresIn,
    } as SnippetType);
    const snippet = await Snippet.findByIdAndUpdate(id, formattedSnippet, {
      new: true,
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

export const deleteSnippet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findByIdAndDelete(id);
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
