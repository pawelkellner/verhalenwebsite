import styles from "./page.module.scss";
import Paragraph from "../components/typography/paragraph";
import AddItem from "../components/firebase/AddItem";

export default function Home() {

  return (
    <main className={styles.main}>
      <Paragraph variant="sm">Hello</Paragraph>
      <AddItem></AddItem>
    </main>
  );
}
