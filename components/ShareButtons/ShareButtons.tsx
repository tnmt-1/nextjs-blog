import {
  HatenaIcon,
  HatenaShareButton,
  LineIcon,
  LineShareButton,
  PocketIcon,
  PocketShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";
import styles from "./ShareButtons.module.css";

type ShareButtonProps = {
  url: string;
  title: string;
};

export function ShareButtons({ url, title }: ShareButtonProps): JSX.Element {
  return (
    <div className={styles.share}>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LineShareButton url={url} title={title}>
        <LineIcon size={32} round />
      </LineShareButton>

      <PocketShareButton url={url} title={title}>
        <PocketIcon size={32} round />
      </PocketShareButton>

      <HatenaShareButton url={url} title={title}>
        <HatenaIcon size={32} round />
      </HatenaShareButton>
    </div>
  );
}
