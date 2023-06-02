import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { markdownToHtml } from "../../../lib/markdownToHtml";
import styles from "../../../styles/[something].module.css";

type paramsProps = {
  params: {
    something: string;
  };
};

export default async function Home({ params }: paramsProps) {
  const fileName = decodeURI(params.something);

  const contentPath = path.join(process.cwd(), `something/${fileName}.md`);
  const fileContents = fs.readFileSync(contentPath, "utf-8");
  const { content } = matter(fileContents);

  const html = await markdownToHtml(content);

  return (
    <article
      className={styles.article}
      dangerouslySetInnerHTML={{
        __html: `${html}`,
      }}
    />
  );
}
