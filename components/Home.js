import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Article from "./Article";
import TopArticle from "./TopArticle";
import styles from "../styles/Home.module.css";

function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const hidden = useSelector((state) => state.hiddenArticles.value);

  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState({});
  
  const BACKEND_ADDRESS =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://newspaper-back.vercel.app";

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/articles`)
      .then((response) => response.json())
      .then((data) => {
        setTopArticle(data.articles[0]);
        setArticlesData(data.articles.filter((data, i) => i > 0));
      });
  }, []);

  const articlesFilter = articlesData.filter((e) => !hidden.includes(e.title));

  console.log(articlesFilter);

  const articles = articlesFilter.map((data, i) => {
    const isBookmarked = bookmarks.some(
      (bookmark) => bookmark.title === data.title
    );
    return <Article key={i} {...data} isBookmarked={isBookmarked} />;
  });

  let topArticles;
  if (bookmarks.some((bookmark) => bookmark.title === topArticle.title)) {
    topArticles = <TopArticle {...topArticle} isBookmarked={true} />;
  } else {
    topArticles = <TopArticle {...topArticle} isBookmarked={false} />;
  }

  return (
    <div>
      <Head>
        <title>Morning News - Home</title>
      </Head>
      {topArticles}
      <div className={styles.articlesContainer}>{articles}</div>
    </div>
  );
}

export default Home;
