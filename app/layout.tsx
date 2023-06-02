import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "../fontawesome/css/all.min.css";
import "../styles/globals.css";
import "../styles/prism.css";

const siteName = process.env.NEXT_PUBLIC_SITE_TITLE ?? "";
const description = "日々の出来事やプログラミング関連について書きます";
const url = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteName,
    description,
    site: `@${process.env.NEXT_PUBLIC_TWITTER_ID}`,
    creator: `@${process.env.NEXT_PUBLIC_TWITTER_ID}`,
  },
  alternates: {
    canonical: url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
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
          <main>{children}</main>
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
      </body>
    </html>
  );
}
