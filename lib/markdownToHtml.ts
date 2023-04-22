import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import rehypeToc, { HeadingNode, HtmlElementNode, TextNode } from "rehype-toc";
import { remark } from "remark";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkPrism from "remark-prism";
import remarkRehype from "remark-rehype";

/**
 * remarkによるmarkdownの構文変換を行う
 * @param markdown markdown記法で書かれたプレーンテキスト
 * @returns 変換結果をString化したもの
 */
export const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkPrism)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener noreferrer"],
    })
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};

/**
 * remarkによるmarkdownの構文変換を行う
 * @param markdown markdown記法で書かれたプレーンテキスト
 * @returns 変換結果をString化したもの
 */
export const markdownToHtmlWithToc = async (markdown: string) => {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkPrism)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener noreferrer"],
    })
    .use(rehypeSlug)
    .use(rehypeToc, {
      nav: false,
      headings: ["h1", "h2", "h3"],
      customizeTOC: function (toc) {
        const tocText: TextNode = {
          type: "text",
          value: "目次",
        };

        const tocHeading: HeadingNode = {
          type: "element",
          tagName: "h2",
          properties: {},
          children: [tocText],
        };

        const tocWrapper: HtmlElementNode = {
          type: "element",
          tagName: "div",
          properties: { className: "toc-wapper" },
          children: [tocHeading, toc],
        };

        return replaceFromOltoUl(tocWrapper);
      },
    })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};

function replaceFromOltoUl(toc: HtmlElementNode) {
  if (toc.tagName === "ol") {
    toc.tagName = "ul";
  }

  if (toc.children) {
    toc.children.forEach((child: any) => {
      child = replaceFromOltoUl(child);
    });
  }

  return toc;
}
