import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
import Image from "next/image";
import styles from "../styles/Article.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { hiddenArticle } from "../reducers/hiddenArticles";

function Article(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const hidden = useSelector((state) => state.hiddenArticles.value);

  const BACKEND_ADDRESS =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://newspaper-back.vercel.app";

  const handleBookmarkClick = () => {
    if (!user.token) {
      return;
    }

    fetch(`${BACKEND_ADDRESS}/users/canBookmark/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.canBookmark) {
          if (props.isBookmarked) {
            dispatch(removeBookmark(props));
          } else {
            dispatch(addBookmark(props));
          }
        }
      });
  };

  let iconStyle = {};
  if (props.isBookmarked) {
    iconStyle = { color: "#E9BE59" };
  }

  const handlehidden = (data) => {
    if (hidden.some((el) => el === data)) {
      return;
    } else {
      dispatch(hiddenArticle(data));
    }
  };
  return (
    <div className={styles.articles}>
      <div className={styles.articleHeader}>
        <h3 className={styles.titleH3}> {props.title}</h3>
        <FontAwesomeIcon
          onClick={() => handlehidden(props.title)}
          className={styles.eye}
          icon={faEyeSlash} /*style={{color: '#3749a4'}}*/
        />
        <FontAwesomeIcon
          onClick={() => handleBookmarkClick()}
          icon={faBookmark}
          style={iconStyle}
          className={styles.bookmarkIcon}
        />
      </div>
      <h4 style={{ textAlign: "right" }}>- {props.author}</h4>
      <div className={styles.divider}></div>
      <div className={styles.containerImage}>
      <Image
        src={decodeURIComponent(props.urlToImage)}
        alt={props.title}
        width={600}
        height={314}
      />
      </div>
      <p className={styles.description}>{props.description}</p>
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.articleLink}
      >
        Vers l'article
      </a>
    </div>
  );
}

export default Article;