import styles from "./page.module.scss";
import { theme } from "../theme";

export default function Home() {
  return (
    <main className={styles.main}>
      <p style={{ color: theme.black }}>Verhalen Website</p>
    </main>
  );
}
