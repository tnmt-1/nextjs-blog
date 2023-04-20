import { format } from "date-fns";
import fs, { promises } from "fs";
import matter from "gray-matter";
import path from "path";
import markdownToHtml from "./markdownToHtml";

export const posts = async () => {
  const postsDirectory = path.join(process.cwd(), "posts");
  const fileNames = await promises.readdir(postsDirectory);
  return fileNames
    .filter((fileName) => {
      return fileName !== ".git";
    })
    .map((fileName) => {
      const fileContents = fs.readFileSync(
        path.join(process.cwd(), "posts", fileName),
        "utf-8"
      );
      const { data } = matter(fileContents);

      const matched: RegExpMatchArray | null = fileName.match(
        /^([0-9]{4}-[0-9]{2}-[0-9]{2})[_-](.+)$/
      );

      const dateString = matched ? matched[1] : "";
      const file = matched ? matched[2] : "";
      const slug = path.basename(file, path.extname(file));

      return {
        id: path.basename(fileName, path.extname(fileName)),
        title: data.title ?? slug,
        publishedAt: data.date ? format(data.date, "yyyy-MM-dd") : dateString,
      };
    })
    .sort((a, b) => {
      if (a.publishedAt > b.publishedAt) {
        return -1;
      }
      return a.publishedAt <= b.publishedAt ? 1 : -1;
    });
};

export const post = async (urlPath: string) => {
  const basePostPath = path.join("posts", urlPath);
  const realPostPath = path.join(process.cwd(), `${basePostPath}.md`);
  const fileContents = fs.readFileSync(realPostPath, "utf-8");
  const { data, content } = matter(fileContents);

  const matched: RegExpMatchArray | null = urlPath.match(
    /^([0-9]{4}-[0-9]{2}-[0-9]{2})[_-](.+)$/
  );
  const dateString = matched ? matched[1] : "";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return {
    title: data.title,
    publishedAt: data.date ? format(data.date, "yyyy-MM-dd") : dateString,
    body: await markdownToHtml(content),
    path: `${siteUrl}/${basePostPath}`,
    tags: data.tags ?? null,
  };
};
