import styles from "./page.module.scss";
import Paragraph from "../components/typography/paragraph";
import Button from "../components/button";

export default function Home() {
  return (
    <main className={styles.main}>
      <Paragraph variant="sm">Hello</Paragraph>
      <Button variant="secondary">Ontdek meer en doe mee!</Button>
    </main>
  );
}
