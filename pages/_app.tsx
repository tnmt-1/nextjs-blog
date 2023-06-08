import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import "@/fontawesome/css/all.min.css";
import "@/styles/globals.css";
import "@/styles/prism.css";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="google-site-verification"
          content="nfun4SJX5ghRk03WesHDmjQb9DiZNxtEcy-Oy1_mzh8"
        />
      </Head>
      <DefaultSeo
        defaultTitle="mahlog"
        canonical={process.env.NEXT_PUBLIC_SITE_URL}
        description="日々の出来事やプログラミング関連について書きます。"
        twitter={{
          handle: process.env.NEXT_PUBLIC_SITE_TITLE,
          site: process.env.NEXT_PUBLIC_SITE_TITLE,
          cardType: "summary",
        }}
        openGraph={{
          type: "website",
          title: process.env.NEXT_PUBLIC_SITE_TITLE,
          description: "日々の出来事やプログラミング関連について書きます。",
          site_name: process.env.NEXT_PUBLIC_SITE_TITLE,
          url: process.env.NEXT_PUBLIC_SITE_URL,
        }}
      />
      <section className="container">
        <Header />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </section>
    </>
  );
}

export default MyApp;
