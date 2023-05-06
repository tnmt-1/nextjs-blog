import { format } from "date-fns";
import fs, { promises } from "fs";
import matter from "gray-matter";
import path from "path";
import { markdownToHtmlWithToc } from "./markdownToHtml";

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
        /^(([0-9]{4})([0-9]{2})([0-9]{2}))([0-9]{2})([0-9]{2})([0-9]{2}).+$/
      );

      const getPublishedAt = () => {
        if (!matched) return "";
        if (data.date) return format(data.date, "yyyy-MM-dd");
        return format(
          new Date(`${matched[2]}-${matched[3]}-${matched[4]}`),
          "yyyy-MM-dd"
        );
      };

      const getTimestamp = () => {
        if (!matched) return 0;
        if (data.date) return Number(data.date);
        return Number(
          new Date(
            `${matched[2]}-${matched[3]}-${matched[4]} ${matched[5]}:${matched[6]}:${matched[7]}`
          )
        );
      };

      const file = matched ? matched[1] : "";
      const slug = path.basename(file, path.extname(file));

      return {
        id: path.basename(fileName, path.extname(fileName)),
        title: data.title ?? slug,
        publishedAt: getPublishedAt(),
        timestamp: getTimestamp(),
        emoji: data.emoji || null,
      };
    })
    .sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return -1;
      }
      return a.timestamp <= b.timestamp ? 1 : -1;
    });
};

export const post = async (urlPath: string) => {
  const basePostPath = path.join("posts", urlPath);
  const realPostPath = path.join(process.cwd(), `${basePostPath}.md`);
  const fileContents = fs.readFileSync(realPostPath, "utf-8");
  const { data, content } = matter(fileContents);

  const matched: RegExpMatchArray | null = urlPath.match(
    /^(([0-9]{4})([0-9]{2})([0-9]{2})).+$/
  );

  const getPublishedAt = () => {
    if (!matched) return "";
    if (data.date) return format(data.date, "yyyy-MM-dd");
    return format(
      new Date(`${matched[2]}-${matched[3]}-${matched[4]}`),
      "yyyy-MM-dd"
    );
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return {
    title: data.title,
    publishedAt: getPublishedAt(),
    body: await markdownToHtmlWithToc(content),
    path: `${siteUrl}/${basePostPath}`,
    tags: data.tags ?? null,
    emoji: data.emoji || null,
  };
};
