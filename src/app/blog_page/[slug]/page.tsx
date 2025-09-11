// import Link from 'next/link';
import Image from "next/image";
import serverClient from '@/lib/serverClient';
import ArticleList from '@/components/ArticleList';
import '@/styles/component/articleDetail.css';

type Params = { slug: string };

export const revalidate = 3600;

export default async function ArticleDetail({ params, }: { params: Promise<Params>; }) {
  const { slug } = await params;

  let article: IArticle | null = null;
  try {
    const res = await serverClient.get<IArticleResponse>(
      `/blog?filters=${encodeURIComponent(`slug[equals]${slug}`)}&limit=1`
    );
    article = res.data.contents?.[0] ?? null;
  } catch {}

  if (!article) {
    try {
      const byId = await serverClient.get<IArticle>(`/blog/${slug}`);
      article = (byId.data as IArticle) ?? null;
    } catch {}
  }

  if (!article) return;

  const RELATED_LIMIT = 4;
  const relatedFields = ['id','slug','title','eyecatch','category','publishedAt'].join(',');

  let relatedUrl = '';
  if (article.category?.id) {
    // related by category, excluding current article
    const filters = `category[equals]${article.category.id}[and]id[not_equals]${article.id}`;
    relatedUrl = `/blog?filters=${encodeURIComponent(filters)}&fields=${relatedFields}&orders=-publishedAt&limit=${RELATED_LIMIT}`;
  } else {
    // fallback: latest posts, excluding current article
    const filters = `id[not_equals]${article.id}`;
    relatedUrl = `/blog?filters=${encodeURIComponent(filters)}&fields=${relatedFields}&orders=-publishedAt&limit=${RELATED_LIMIT}`;
  }

  const relatedRes = await serverClient.get<IArticleResponse>(relatedUrl);
  const related = relatedRes.data.contents;

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <main className="main">
      <div className="container">
        <article className="article-detail">
          <header className="article-detail__header">
            <div className="article-detail__meta">
              {article.category?.name && (
                <span className="article-detail__category">{article.category.name}</span>
              )}
              {formattedDate && (
                <time className="article-detail__date" dateTime={article.publishedAt}>
                  {formattedDate}
                </time>
              )}
            </div>
            <h1 className="article-detail__title">{article.title}</h1>
          </header>
          <figure className="article-detail__figure">
            <Image
              src={article.eyecatch?.url || '/article--empty.png'}
              alt={article.title}
              width={article.eyecatch?.width || 1200}
              height={article.eyecatch?.height || 630}
              loading="lazy"
            />
          </figure>
          <div
            className="article-detail__description"
            dangerouslySetInnerHTML={{ __html: article.content ?? '' }}
          />
        </article>

        {related?.length > 0 && (
          <section className="article-detail__related">
            <h2>Related articles</h2>
            <ArticleList articles={related} basePath="/blog_page" />
          </section>
        )}
      </div>
    </main>
  );
}
