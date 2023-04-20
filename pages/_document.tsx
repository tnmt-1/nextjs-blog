import { Head, Html, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="ja" className="holiday-css-dark">
      <Head />
      <body>
        <header>
          <nav>
            <h2>
              <Link href="/">mahlog</Link>
            </h2>
          </nav>
        </header>
        <Main />
        <footer>Copyright © {new Date().getFullYear()} mahlog</footer>
        <NextScript />
      </body>
    </Html>
  );
}
