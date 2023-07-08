import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul>
          <li>
            <Link href="/site/プライバシーポリシー">プライバシーポリシー</Link>
          </li>
          <li>
            <Link href="/site/プロフィール">プロフィール</Link>
          </li>
        </ul>
      </nav>
      <section className={styles.copyright}>
        Copyright © {new Date().getFullYear()} mahlog
      </section>
    </footer>
  );
}
