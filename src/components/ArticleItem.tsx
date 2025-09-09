import Image from "next/image";
import Link from "next/link";
import { truncateChars } from "@/utils/text";
import "@/styles/component/articleItem.css";

interface ArticleItemProps {
  article: IArticle;
  basePath?: string;
}

const ArticleItem = ({ article, basePath = "/blog" }: ArticleItemProps) => {
  return  (
    
    <li key={article.id} className="article-item">
      <Link href={`${basePath}/${article.slug || article.id}`}>
        <figure>
            <Image
            src={article.eyecatch?.url || '/article--empty.png'}
            alt={article.title}
            width={article.eyecatch?.width || 460}
            height={article.eyecatch?.height || 300}
            loading="lazy"
            />
          <span className="article-item__category">{article.category.name}</span>
        </figure>
        <h3>{truncateChars(article.title, 30)}</h3>
      </Link>
    </li>
  );
}

export default ArticleItem;
