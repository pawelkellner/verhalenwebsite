import styles from "./page.module.scss";
import Paragraph from "../components/typography/paragraph";
import Hero from "../components/hero/hero";

export default function Home() {
  return (
    <main className={styles.main}>
        <Hero></Hero>
        <Paragraph variant="sm">Hello</Paragraph>
    </main>
  );
}
