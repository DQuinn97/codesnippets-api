import { SnippetType } from "./types";

export const formatSnippet = (snippet: SnippetType) => {
  const { title, code, language, tags, expiresIn } = snippet;
  const encodedCode = Buffer.from(code || "").toString("base64");

  const output = {
    title,
    code: encodedCode,
    language,
    tags,
  } as SnippetType;
  //@ts-ignore
  if (expiresIn) output.expiresIn = Date.now() + expiresIn * 1000;

  return output;
};
