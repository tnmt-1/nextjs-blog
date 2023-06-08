import { ReactNode } from "react";
import styles from "./Main.module.css";

type Props = {
  children?: ReactNode;
};

export default function Main({ children }: Props): JSX.Element {
  return (
    <main className={styles.main}>
      <section>{children}</section>
    </main>
  );
}
