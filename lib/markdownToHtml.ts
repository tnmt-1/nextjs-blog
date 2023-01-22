import { remark } from 'remark';
import html from 'remark-html';
import remarkBreaks from 'remark-breaks'
import prism from 'remark-prism';
import remarkGfm from 'remark-gfm'
/**
 * remarkによるmarkdownの構文変換を行う
 * @param markdown markdown記法で書かれたプレーンテキスト
 * @returns 変換結果をString化したもの
 */
const markdownToHtml = async (markdown: string) => {
    const result = await remark().use(remarkGfm).use(html, { sanitize: false }).use(remarkBreaks).use(prism).process(markdown);
    return result.toString();
};

export default markdownToHtml;
