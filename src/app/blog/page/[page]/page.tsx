import { BLOG_LIMIT } from '@/lib/constants';
import serverClient from '@/lib/serverClient';
import ArticleList from '@/components/ArticleList';
import Paging from '@/components/Paging_page';

type Params = { page: string };

export const revalidate = 3600;

export default async function Blog( { params }: { params: Promise<Params>; }) {
  const { page } = await params;
  const currentPage = Number.parseInt(page, 10) || 1;
  const offset = (currentPage - 1) * BLOG_LIMIT;

  const res = await serverClient.get<IArticleResponse>(`/blog?offset=${offset}&limit=${BLOG_LIMIT}`);
  const data = res.data;

  return (
    <main className="main">
      <div className="container">
        <h1 className="title">Blog (/page/N)</h1>
        <ArticleList articles={data.contents} basePath="/blog" />
        <Paging totalCount={data.totalCount} currentPage={currentPage} />
      </div>
    </main>
  );
}
