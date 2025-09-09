"use client";

import styles from "../styles/component/ArticleList.module.css";
import "@/styles/component/skeleton.css";

type Props = { count?: number };

const ArticleListSkeleton = ({ count = 6 }: Props) => {
  const items = Array.from({ length: count });
  return (
    <ul className={styles.list} aria-hidden>
      {items.map((_, idx) => (
        <li key={idx} className="article-skel">
          <div className="article-skel__thumb skeleton-box" />
          <div className="article-skel__meta">
            <span className="skeleton-pill" />
          </div>
          <div className="skeleton-line" />
        </li>
      ))}
    </ul>
  );
};

export default ArticleListSkeleton;
