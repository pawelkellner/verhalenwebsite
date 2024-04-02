import styles from "./page.module.scss";
import Paragraph from "../components/typography/paragraph";

export default function Home() {
  return (
    <main className={styles.main}>
      <Paragraph variant="sm">Hello</Paragraph>
    </main>
  );
}
