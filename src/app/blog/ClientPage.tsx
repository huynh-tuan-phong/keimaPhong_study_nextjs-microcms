'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import client from '@/lib/client';
import { BLOG_LIMIT } from '@/lib/constants';
import ArticleList from '@/components/ArticleList';
import ArticleListSkeleton from '@/components/ArticleList.Skeleton';
import Paging from '@/components/Paging';
import styles from '@/styles/page/blog.module.css';

type CacheEntry = { contents: IArticle[]; totalCount: number; ts: number };

export default function ClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageFromUrl = useMemo(() => {
    const raw = searchParams?.get('page') ?? '1';
    const parsed = Number.parseInt(raw, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  }, [searchParams]);

  const [currentPage, setCurrentPage] = useState<number>(pageFromUrl);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const cacheRef = useRef<Map<number, CacheEntry>>(new Map());

  useEffect(() => {
    if (currentPage !== pageFromUrl) setCurrentPage(pageFromUrl);
  }, [pageFromUrl, currentPage]);

  const offset = useMemo(() => (currentPage - 1) * BLOG_LIMIT, [currentPage]);

  useEffect(() => {
    const el = document.querySelector('[data-article-list-top]');
    (el as HTMLElement | null)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentPage]);

  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', String(page));
    router.replace(`?${params.toString()}`);
  }, [router, searchParams]);

  useEffect(() => {
    let abort: AbortController | null = new AbortController();
    const cached = cacheRef.current.get(currentPage);

    setLoading(true);
    setErrorMsg('');

    const FIVE_MIN = 5 * 60 * 1000;
    if (cached && Date.now() - cached.ts < FIVE_MIN) {
      setArticles(cached.contents);
      setTotalCount(cached.totalCount);
      setLoading(false);
      return () => { abort?.abort(); };
    }

    (async () => {
      try {
        const res = await client.get<IArticleResponse>(
          `/blog?offset=${offset}&limit=${BLOG_LIMIT}`,
          { signal: (abort as AbortController).signal as AbortSignal }
        );
        setArticles(res.data.contents);
        setTotalCount(res.data.totalCount);
        cacheRef.current.set(currentPage, {
          contents: res.data.contents,
          totalCount: res.data.totalCount,
          ts: Date.now(),
        });
      } catch (err: unknown) {
        const isCanceled = (e: unknown) =>
          typeof e === 'object' && e !== null && (
            ('name' in e && (e as { name?: string }).name === 'CanceledError') ||
            ('message' in e && (e as { message?: string }).message === 'canceled')
          );
        if (isCanceled(err)) return;
        setErrorMsg('Failed to load data. Please try again.');
        console.error('Error fetching blog data:', err);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      abort?.abort();
      abort = null;
    };
  }, [currentPage, offset]);

  return (
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
            <div data-article-list-top />

            {errorMsg && (
              <div role="alert" className="my-4">
                <p>{errorMsg}</p>
                <button
                  onClick={() => handlePageChange(currentPage)}
                  className="btn"
                  aria-label="Retry"
                >
                  Retry
                </button>
              </div>
            )}

            {loading && (
              <>
                <span className="sr-only" aria-live="polite">Loading...</span>
                <ArticleListSkeleton count={BLOG_LIMIT} />
                <div className={styles['paging-skeleton']} />
              </>
            )}

            {!loading && !errorMsg && (
              <>
                <ArticleList articles={articles} basePath="/blog" />
                <Paging
                  totalCount={totalCount}
                  currentPage={currentPage}
                  perPage={BLOG_LIMIT}
                  onPageChange={handlePageChange}
                  disabled={loading}
                />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

