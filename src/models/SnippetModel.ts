import { timeStamp } from "console";
import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    expiresIn: {
      type: Date,
      nullable: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Snippet = mongoose.model("Snippet", SnippetSchema);
