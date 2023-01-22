import { Html, Head, Main, NextScript } from 'next/document'
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body>
        <header>
          <nav>
            <h2><Link href="/">mahlog</Link></h2>
          </nav>
        </header>
        <Main />
        <footer>
          Copyright © {new Date().getFullYear()} mahlog
        </footer>
        <NextScript />
      </body>
    </Html>
  )
}
