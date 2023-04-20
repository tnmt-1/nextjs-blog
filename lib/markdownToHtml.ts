import { remark } from "remark";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import prism from "remark-prism";

/**
 * remarkによるmarkdownの構文変換を行う
 * @param markdown markdown記法で書かれたプレーンテキスト
 * @returns 変換結果をString化したもの
 */
const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .use(remarkBreaks)
    .use(prism)
    .process(markdown);
  return result.toString();
};

export default markdownToHtml;
