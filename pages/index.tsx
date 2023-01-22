import { NextPage, InferGetStaticPropsType } from 'next';
import Link from "next/link";
import { posts } from "../lib/posts";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ blog }) => {
  const listBlockStyle = {
    marginBottom: "20px"
  }
  const mainStyle = {
    paddingTop: "15px"
  }

  return (
    <main className="container" style={mainStyle}>
      {blog.map((blog) => (
        <div key={blog.id} style={listBlockStyle}>
          <small><time>{blog.publishedAt}</time></small>
          <div>
            <Link href={`/posts/${blog.id}`}>
              {blog.title}
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  return {
    props: {
      blog: await posts(),
    },
  };
};

export default Home;
