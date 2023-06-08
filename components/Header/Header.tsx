import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <section>
        <h2 className={styles.title}>
          <Link href="/">
            <Image
              alt="Logo"
              src="/beer.png"
              width="32"
              height="32"
            />
            <span className={styles.siteTitle}>mahlog</span>
          </Link>
        </h2>
      </section>
    </header>
  );
}
