import { useEffect } from "react";

export const useTweetEmbed = () => {
  // https://ningensei848.github.io/againstc/blog/2022/02/22/embed-tweet-to-docusaurus
  // https://zenn.dev/catnose99/articles/329d7d61968efb
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/js/widgets.js";
    document.body.appendChild(script);

    // アンマウント時に一応scriptタグを消しておく
    return () => {
      document.body.removeChild(script);
    };
  }, []);
};
