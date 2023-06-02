import { Metadata } from "next";
import dynamic from "next/dynamic";
import striptags from "striptags";
import { post } from "../../../lib/posts";
import styles from "../../../styles/[id].module.css";

export async function generateMetadata({
  params,
}: paramsProps): Promise<Metadata> {
  const path = params?.id ?? "";
  const blog = await post(path);
  const description =
    blog.description ??
    (function () {
      const content = striptags(blog.body, "<details>").split("</details>")[1];
      const firstSentence = content.split("。")[0];
      return firstSentence;
    })();

  return {
    title: blog.title,
    description: description,
  };
}

type paramsProps = {
  params: {
    id: string;
  };
};

const TweetEmbed = dynamic(() => import("@/components/Twitter/TweetEmbed"), {
  ssr: false,
});

const ShareButtons = dynamic(
  () => import("@/components/ShareButtons/ShareButtons"),
  { ssr: false }
);

export default async function Home({ params }: paramsProps) {
  const path = params?.id ?? "";
  const blog = await post(path);

  return (
    <>
      <TweetEmbed>
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
          <div className={styles.tags}>
            {blog.tags.map((tag: string) => {
              return (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              );
            })}
          </div>
        )}
        <div className={styles.share}>
          <ShareButtons url={blog.path} title={blog.title} />
        </div>
      </TweetEmbed>
    </>
  );
}

// // 静的生成のためのパスを指定します
// export const getStaticPaths = async () => {
//   const data = await posts();
//   const paths = data.map((content) => `/posts/${content.id}`);
//   return { paths, fallback: false };
// };

// // データをテンプレートに受け渡す部分の処理を記述します
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ id: string }>
// ) => {
//   const path = context.params?.id ?? "";
//   const data = await post(path);

//   return {
//     props: {
//       blog: data,
//     },
//   };
// };

// export default BlogId;
