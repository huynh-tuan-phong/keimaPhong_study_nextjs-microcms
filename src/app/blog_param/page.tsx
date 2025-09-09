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
            <h1 className={styles['page-title']}>Blog (?page)</h1>
            <p className={styles['page-desc']}>
              Server component with query-parameter pagination.
              Each page is fetched on the server; links use <code>?page</code>.
            </p>
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
