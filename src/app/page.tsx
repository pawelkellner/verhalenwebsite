import styles from "./page.module.scss";
import Paragraph from "../components/typography/paragraph";
import FirebasePage from "../components/firebase/FirebasePage";

export default function Home() {

  return (
    <main className={styles.main}>
      <Paragraph variant="sm">Hello</Paragraph>
      <FirebasePage></FirebasePage>
    </main>
  );
}
