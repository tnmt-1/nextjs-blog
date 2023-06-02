import Link from "next/link";
import styles from "../styles/index.module.css";
import { posts } from "../lib/posts";

export default async function Home() {
  const blogs = await posts();
  return (
    <>
      {blogs.map((blog) => (
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
}
