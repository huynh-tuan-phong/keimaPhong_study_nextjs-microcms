interface ICategory {
  id: string;
  name: string;
}

interface IArticle {
  id: string;
  title: string;
  content: string;
  eyecatch?: {url: string, height: number, width: number};
  category: ICategory;
  slug: string;
  publishedAt: string;
}

interface IArticleResponse {
  contents: IArticle[];
  totalCount: number;
  offset: number;
  limit: number;
}
