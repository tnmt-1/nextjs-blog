import { Head, Html, Main, NextScript } from "next/document";
import Image from "next/image";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body>
        <div className="container">
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
          <footer>
            <nav>
              <ul>
                <li>
                  <Link href="/site/このサイトについて">
                    このサイトについて
                  </Link>
                </li>
                <li>
                  <Link href="/site/プライバシーポリシー">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link href="/site/個人情報">個人情報</Link>
                </li>
              </ul>
            </nav>
            <div className="copyright">
              Copyright © {new Date().getFullYear()} mahlog
            </div>
          </footer>
        </div>
        <NextScript />
      </body>
    </Html>
  );
}