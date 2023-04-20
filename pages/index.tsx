import { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { posts } from "../lib/posts";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ blog }) => {
  const listBlockStyle = {
    display: "block",
    marginBottom: "20px",
  };
  const mainStyle = {
    paddingTop: "15px",
  };

  return (
    <main className="container" style={mainStyle}>
      {blog.map((blog) => (
        <Link href={`/posts/${blog.id}`} key={blog.id} style={listBlockStyle}>
          <small>
            <time>{blog.publishedAt}</time>
          </small>
          <div>{blog.title}</div>
        </Link>
      ))}
    </main>
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
