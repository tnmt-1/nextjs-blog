import { posts } from "@/lib/posts";
import { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import styles from "./index.module.css";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ blog }) => {
  return (
    <>
      {blog.map((blog) => (
        <div key={blog.id} className={styles.card}>
          <small>
            <time>{blog.publishedAt}</time>
          </small>
          <Link href={`/posts/${blog.id}`}>
            <div>{blog.title}</div>
          </Link>
        </div>
      ))}
    </>
  );
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  return {
    props: {
      blog: await posts(),
    },
  };
};

export default Home;
