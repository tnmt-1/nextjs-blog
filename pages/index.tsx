import { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { posts } from "../lib/posts";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ blog }) => {
  return (
    <section className="blogs">
      {blog.map((blog) => (
        <Link href={`/posts/${blog.id}`} key={blog.id} className="row">
          <div className="icon">
            <span>{blog.emoji || "🧀"}</span>
          </div>
          <div className="row-body">
            <small>
              <time>{blog.publishedAt}</time>
            </small>
            <span className="line_wrap">{blog.title}</span>
          </div>
        </Link>
      ))}
    </section>
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
