import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
import styles from "../styles/TopArticle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function TopArticle(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

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

  return (
    <div className={styles.topContainer}>
      <div className={styles.containerImage}>
      <img src={props.urlToImage} className={styles.image} alt={props.title} />
      </div>
      <div className={styles.topText}>
        <h2 className={styles.topTitle}>{props.title}</h2>
        <FontAwesomeIcon
          onClick={() => handleBookmarkClick()}
          icon={faBookmark}
          style={iconStyle}
          className={styles.bookmarkIcon}
        />
        <h4>{props.author}</h4>
        <p>{props.description}</p>
        <a
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.articleLink}
        >
          Vers l'article
        </a>
      </div>
    </div>
  );
}

export default TopArticle;
