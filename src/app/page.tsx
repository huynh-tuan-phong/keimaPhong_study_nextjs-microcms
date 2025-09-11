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
            <Link href="/blog">Hybrid CSR</Link> — Server-rendered shell; list rendered on the client; keeps ?page in sync.
          </li>
          <li>
            <Link href="/blog_client">Only CSR</Link> — Client-only rendering; data and pagination load after mount; no ?page sync.
          </li>
          <li>
            <Link href="/blog_param">ISR (?page)</Link> — Server-rendered on a schedule (revalidate); pagination via query param ?page.
          </li>
          <li>
            <Link href="/blog_page">ISR (/page/N)</Link> — Server-rendered on a schedule (revalidate); pagination via route segment /page/N.
          </li>
        </ul>
      </div>
    </main>
  );
}
