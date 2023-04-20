import { ShareButtons } from "@/components/ShareButtons/ShareButtons";
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
import striptags from "striptags";
import { post, posts } from "../../lib/posts";
import styles from "./[id].module.css";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const BlogId: NextPage<Props> = ({ blog }) => {
  const description = striptags(blog.body).split("。")[0];

  return (
    <main>
      <NextSeo
        title={`${blog.title} | ${process.env.NEXT_PUBLIC_SITE_TITLE}`}
        description={description}
      />
      <h1>{blog.title}</h1>
      <small>
        <time>{blog.publishedAt}</time>
      </small>
      <article
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
      {blog.tags && (
        <div className="tags">
          {blog.tags.map((tag: string) => {
            return (
              <span key={tag} className="tag">
                {tag}
              </span>
            );
          })}
        </div>
      )}
      <div className={styles.share}>
        <ShareButtons url={blog.path} title={blog.title} />
      </div>
    </main>
  );
};

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await posts();
  const paths = data.map((content) => `/posts/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const path = context.params?.id ?? "";
  const data = await post(path);

  return {
    props: {
      blog: data,
    },
  };
};

export default BlogId;
