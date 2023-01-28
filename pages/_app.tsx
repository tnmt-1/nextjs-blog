import Head from "next/head";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import "../styles/globals.css";
import "../styles/holiday.css";

function MyApp({ Component, pageProps }: AppProps) {
  const siteUrl = process.env.SITE_URL ?? "";

  return (
    <>
      <Head>
        <title>mahlog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="/css/prism.css" rel="stylesheet" />
      </Head>
      <DefaultSeo
        defaultTitle="mahlog"
        canonical={siteUrl}
        description="日々の出来事やプログラミング関連について書きます。"
        twitter={{
          handle: "mahlog",
          site: "mahlog",
          cardType: "summary",
        }}
        openGraph={{
          type: "website",
          title: "mahlog",
          description: "日々の出来事やプログラミング関連について書きます。",
          site_name: "mahlog",
          url: siteUrl,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
