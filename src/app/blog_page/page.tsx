import { BLOG_LIMIT } from '@/lib/constants';
import ArticleList from '@/components/ArticleList';
import Paging from '@/components/Paging_page';
import styles from '@/styles/page/blog.module.css';
import serverClient from '@/lib/serverClient';

export const revalidate = 3600;

export default async function Blog() {
  const page = 1;
  const offset = 0;

  const res = await serverClient.get<IArticleResponse>(`/blog?offset=${offset}&limit=${BLOG_LIMIT}`);
  const data = res.data;
  
  // console.log('Blog data:', data);

  return (
    <main className="main">
      <div className="container">
        <div className={styles['page-grid']}>
          <aside className={styles['page-aside']}>
            <h1 className={styles['page-title']}>Blog (/page/N)</h1>
            <p className={styles['page-desc']}>
              Server component with route-segment pagination.
              SEO-friendly links like <code>/blog_page/page/2</code>.
            </p>
          </aside>
          <section className={styles['page-content']}>
            <ArticleList articles={data.contents} basePath="/blog_page" />
            <Paging totalCount={data.totalCount} currentPage={page} />
          </section>
        </div>
      </div>
    </main>
  );
}
