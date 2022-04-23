import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import styles from "./MoviesList.module.css";

import { motion } from "framer-motion";

const MoviesList = () => {
  const { movies, isLoading } = useGlobalContext();
  

  if (isLoading) {
    return <div className={styles.loading}></div>;
  }

  return (
    <section className={styles.movies}>
      {movies.map((movie, i) => {
        const {
          id,
          overview,
          poster_path: poster,
          release_date: date,
          title,
          vote_average: vote,
        } = movie;

        const availablePic = `https://image.tmdb.org/t/p/w400/${poster}`;
        const noPic =
          "https://pngimage.net/wp-content/uploads/2018/06/no-image-available-png-7.png";

        const container = {
          hidden: { opacity: 0, translateX: "-30vw" },
          show: {
            opacity: 1,
            translateX: 0,
            transition: {
              duration: 2,
              delay: i * 1,
            },
          },
        }; 

        const item = {
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              duration: 6,
              delay: i * 1,
            },
          },
        };

        const variants = {
          visible: (i) => ({
            opacity: 1,
            transition: {
              delay: i * 3,
            },
          }),
          hidden: { opacity: 0 },
        };

        return (
          <Link to={`/movie/${id}`} key={id} className={styles.movie}>
            <motion.article
              className={styles.article}
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.img
                src={poster === null ? noPic : availablePic}
                alt={title}
                variants={item}
                initial="hidden"
                animate="show"
              />

              <div className={styles["movie-info"]}>
                <h2 className={styles.title}>{title}</h2>
                <h4 className={styles.overview}>{`${overview.substring(
                  0,
                  200
                )}...`}</h4>
                <h4>
                  Release date:{" "}
                  <motion.div
                    custom={i}
                    initial="hidden"
                    animate='visible'
                    variants={variants}
                    className={styles.date}
                  >
                    {date}
                  </motion.div>
                </h4>
                <h3>
                  Rating:{" "}
                  <span className={styles.rating}>
                    {vote === 0 ? "N/A" : vote}
                  </span>
                </h3>
              </div>
            </motion.article>
          </Link>
        );
      })}
    </section>
  );
};

export default MoviesList;
