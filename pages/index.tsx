import { posts } from "@/lib/posts";
import { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import styles from "./index.module.css";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ blog }) => {
  return (
    <>
      <section>
        <div>
          このサイトは、日々の生活やプログラミングに関する情報を発信するウェブサイトです。
        </div>
      </section>

      <h2>記事一覧</h2>
      <section className={styles.wrapper}>
        {blog.map((blog) => (
          <Link
            href={`/posts/${blog.id}`}
            key={blog.id}
            className={styles.card}
          >
            <section>
              <label className={styles.title}>{blog.title}</label>
              <small>
                <time>{blog.publishedAt}</time>
              </small>
            </section>
          </Link>
        ))}
      </section>
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
