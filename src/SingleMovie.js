import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import styles from "./SingleMovie.module.css";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(true);

  const fetchMovie = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data) {
      setMovie(data);
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchMovie(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_KEY}
`);
  }, [id]);

  if (isLoading) {
    return <div className={styles.loading}></div>;
  }

  const {
    overview,
    poster_path: poster,
    release_date: date,
    title,
    vote_average: vote,
  } = movie;

  const availablePic = `https://image.tmdb.org/t/p/w500/${poster}`;
  const noPic =
    "https://pngimage.net/wp-content/uploads/2018/06/no-image-available-png-7.png";

  return (
    <section className={styles["single-movie"]}>
      <img src={poster === null ? noPic : availablePic} alt={title} />
      <div className={styles["single-movie-info"]}>
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.overview}>{overview}</h3>
        <h4>
          Rating:{" "}
          <span className={styles.rating}>{vote === 0 ? "N/A" : vote}</span>
        </h4>
        <p>
          Release date: <div className={styles.date}>{date}</div>
        </p>
        <Link to="/" className={styles.btn}>
          Back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
