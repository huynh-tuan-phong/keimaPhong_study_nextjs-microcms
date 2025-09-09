import { Suspense } from 'react';
import ClientPage from './ClientPage';
import ArticleListSkeleton from '@/components/ArticleList.Skeleton';
import styles from '@/styles/page/blog.module.css';
import { BLOG_LIMIT } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default function Blog() {
  return (
    <Suspense
      fallback={
        <main>
          <div className="container">
            <div className={styles['page-grid']}>
              <aside className={styles['page-aside']}>
                <h1 className={styles['page-title']}>Blog (CSR)</h1>
                <p className={styles['page-desc']}>
                  Client-side pagination: data fetched in the browser with a loading skeleton.
                  URL keeps <code>?page</code> in sync; transitions are instant.
                </p>
              </aside>
              <section className={styles['page-content']}>
                <ArticleListSkeleton count={BLOG_LIMIT} />
                <div className={styles['paging-skeleton']} />
              </section>
            </div>
          </div>
        </main>
      }
    >
      <ClientPage />
    </Suspense>
  );
}
