import { defaultSchema } from "hast-util-sanitize";

export const customSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "ul",
    "li",
    "strong",
    "em",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "p",
    "br",
    "div",
    "span",
  ],
  attributes: {
    ...defaultSchema.attributes,
    th: [["style"]],
    td: [["style"]],
    table: [["style"]],
    div: [["style"]],
    span: [["style"]],
  },
};
