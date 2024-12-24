import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wellcome to your ToDo</h1>
      <div className={styles.buttonGroup}>
        <Link href={"/deshbord/login"} className={styles.button}>
          Login
        </Link>
        <Link href={"/deshbord/register"} className={styles.button}>
          Register
        </Link>
      </div>
    </div>
  );
}
