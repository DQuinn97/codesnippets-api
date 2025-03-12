import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: Boolean,
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
  },
  {
    timestamps: true,
  }
);

export const Snippet = mongoose.model("Snippet", SnippetSchema);
