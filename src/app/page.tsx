import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1 className={styles.title}>Welcome</h1>
        <p className={styles.subtitle}>Choose a blog listing method:</p>
        <ul className={styles.linkList}>
          <li>
            <Link href="/blog">Blog (CSR)</Link>
          </li>
          <li>
            <Link href="/blog_param">Blog (?page)</Link>
          </li>
          <li>
            <Link href="/blog_page">Blog (/page/N)</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

