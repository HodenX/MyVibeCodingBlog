import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

interface MarkdownContentProps {
  content: string;
}

export async function MarkdownContent({ content }: MarkdownContentProps) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, {
      theme: {
        light: "github-light",
        dark: "github-dark",
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const htmlContent = String(file);

  return (
    <div
      className="prose-wrapper"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

