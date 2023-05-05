import fs, { promises } from "fs";
import matter from "gray-matter";
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import path from "path";
import { useTweetEmbed } from "../../components/Twitter/Twitter";
import { markdownToHtml } from "../../lib/markdownToHtml";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ content }) => {
  useTweetEmbed();
  return (
    <article
      dangerouslySetInnerHTML={{
        __html: `${content}`,
      }}
    />
  );
};

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "something");
  const fileNames = await promises.readdir(postsDirectory);
  const paths = fileNames.map((fileName) => {
    return { params: { something: `${fileName.split(".")[0]}` } };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ something: string }>
) => {
  const contentPath = path.join(
    process.cwd(),
    `something/${context.params?.something}.md`
  );
  const fileContents = fs.readFileSync(contentPath, "utf-8");
  const { content } = matter(fileContents);

  return {
    props: {
      content: await markdownToHtml(content),
    },
  };
};

export default Home;
