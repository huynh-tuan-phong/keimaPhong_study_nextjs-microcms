import { BLOG_LIMIT } from '@/lib/constants';
import ArticleList from '@/components/ArticleList';
import Paging from '@/components/Paging_page';
import serverClient from '@/lib/serverClient';
import styles from '@/styles/page/blog.module.css';

type Params = { page: string };

export const revalidate = 3600;

export default async function Blog({ params, }: { params: Promise<Params>; }) {
  const { page } = await params;
  const currentPage = Number.parseInt(page, 10) || 1;
  const offset = (currentPage - 1) * BLOG_LIMIT;

  const res = await serverClient.get<IArticleResponse>(`/blog?offset=${offset}&limit=${BLOG_LIMIT}`);
  const data = res.data;

  return (
    <main className="main">
      <div className="container">
        <div className={styles['page-grid']}>
          <aside className={styles['page-aside']}>
        <h1 className={styles['page-title']}>ISR — /page/N</h1>
        <p className={styles['page-desc']}>
          Server-rendered (revalidate 1h); route segment.
        </p>
        <div className={styles['page-note']}>
          <p><strong>ISR</strong>: static cache with background regeneration based on <code>revalidate</code>.</p>
          <p><strong>revalidate = 3600s</strong>: the first request after expiry triggers a rebuild; subsequent requests receive the fresh page.</p>
          <p><strong>/page/N</strong>: pagination via URL segments; SEO-friendly links.</p>
        </div>
          </aside>
          <section className={styles['page-content']}>
            <ArticleList articles={data.contents} basePath="/blog_page" />
            <Paging totalCount={data.totalCount} currentPage={currentPage} />
          </section>
        </div>
      </div>
    </main>
  );
}
