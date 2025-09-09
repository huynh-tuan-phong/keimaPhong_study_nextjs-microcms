import ArticleItem from './ArticleItem';
import styles from "../styles/component/ArticleList.module.css";

interface IArticlesProps {
  articles: IArticle[];
  basePath?: string;
}

const ArticleList = ({ articles, basePath = "/blog" }: IArticlesProps) => {

  return (
    <div>
      {/* <h2>Article List</h2> */}
      <ul className={styles.list}>
        {articles.map((article: IArticle) => {
          return (
              <ArticleItem
                article={article}
                basePath={basePath}
                key={article.id ?? article.slug}
              />
          );
        })}
      </ul>
    </div>
  );
}

export default ArticleList;
