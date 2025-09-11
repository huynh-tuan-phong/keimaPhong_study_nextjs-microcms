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
                <h1 className={styles['page-title']}>Hybrid CSR</h1>
                <p className={styles['page-desc']}>
                  Server-rendered shell; the article list is rendered on the client.
                  Keeps <code>?page</code> in sync in the URL for pagination and back/forward navigation.
                  Acronyms: CSR = Client-Side Rendering; RSC = React Server Components.
                </p>
                <div className={styles['page-note']}>
                  <p><strong>CSR</strong>: data fetched in the browser with a loading skeleton; fast transitions.</p>
                  <p><strong>Hybrid CSR</strong>: server-rendered shell (RSC + Suspense) while the list and pagination run on the client.</p>
                  <ul>
                    <li><strong>Suspense fallback</strong>: the shell shows a skeleton first, then hydrates client data.</li>
                    <li><strong>URL sync</strong>: keeps <code>?page</code> in the address bar; back/forward works as expected.</li>
                    <li><strong>Pros</strong>: smooth paging; minimal server work after first render.</li>
                    <li><strong>Cons</strong>: list HTML isn't in the initial server response (arrives after hydrate).</li>
                    <li><strong>Compare</strong>: vs <em>Only CSR</em> (no <code>?page</code> sync) and vs <em>ISR</em> (HTML contains data; updates per <code>revalidate</code>).</li>
                  </ul>
                </div>
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

