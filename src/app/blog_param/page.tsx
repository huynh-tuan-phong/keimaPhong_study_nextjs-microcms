import { BLOG_LIMIT } from '@/lib/constants';
import ArticleList from '@/components/ArticleList';
import Paging from '@/components/Paging_param';
import styles from '@/styles/page/blog.module.css';
// import { useSearchParams } from 'next/navigation';
import serverClient from '@/lib/serverClient';

export const revalidate = 3600;

type SearchParams = { page?: string };

export default async function Blog({ searchParams, }: { searchParams?: Promise<SearchParams>; }) {
  const sp = await searchParams;
  const raw = sp?.page ?? '1';
  const parsed = Number.parseInt(raw, 10) || 1;
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  
  const offset = (page - 1) * BLOG_LIMIT;
  
  const res = await serverClient.get<IArticleResponse>(`/blog?offset=${offset}&limit=${BLOG_LIMIT}`);
  const data = res.data;
  
  return (
    <main>
      <div className="container">
        <div className={styles['page-grid']}>
          <aside className={styles['page-aside']}>
        <h1 className={styles['page-title']}>ISR — ?page</h1>
        <p className={styles['page-desc']}>
          Server-rendered (revalidate 1h); query param.
          Acronym: ISR = Incremental Static Regeneration.
        </p>
        <div className={styles['page-note']}>
          <p><strong>ISR</strong>: static output is cached and regenerated in the background based on <code>revalidate</code>.</p>
          <p><strong>revalidate = 3600s</strong>: after 1 hour, the next request serves the stale page and triggers a rebuild; the following request gets the fresh page.</p>
          <p><strong>vs SSR</strong>: SSR renders on every request (no cache); ISR is faster but updates on a schedule.</p>
        </div>
          </aside>
          <section className={styles['page-content']}>
            <ArticleList articles={data.contents} basePath="/blog_param" />
            <Paging totalCount={data.totalCount} currentPage={page} />
          </section>
        </div>
      </div>
    </main>
  )
}
