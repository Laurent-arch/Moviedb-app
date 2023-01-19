import { useGlobalContext } from "../context";
import styles from "./SearchBar.module.css";

interface Error {
  show: boolean;
  msg: string;
}

interface ContextProps {
  query: string;
  setQuery: (query: string) => void;
  error: Error;
}

const SearchBar = () => {
  const { query, setQuery, error } = useGlobalContext();

  return (
    <form className={styles["search-bar"]} onSubmit={(e) => e.preventDefault()}>
      <h2>Search for movies</h2>
      <input
        type="text"
        className={styles["form-input"]}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {error.show && <div className={styles.error}>{error.msg}</div>}
    </form>
  );
};

export default SearchBar;