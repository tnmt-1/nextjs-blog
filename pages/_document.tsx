import { Head, Html, Main, NextScript } from "next/document";
import Link from "next/link";
import Image from "next/image";

export default function Document() {
  return (
    <Html lang="ja" className="holiday-css-dark">
      <Head />
      <body>
        <header>
          <h2 className="title">
            <Link href="/">
              <Image
                className="logo"
                alt="Logo"
                src="/beer.png"
                width="32"
                height="32"
              />
              <span>mahlog</span>
            </Link>
          </h2>
        </header>
        <Main />
        <footer>Copyright © {new Date().getFullYear()} mahlog</footer>
        <NextScript />
      </body>
    </Html>
  );
}
