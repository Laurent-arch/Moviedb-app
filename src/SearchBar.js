import { useGlobalContext } from "./context"
import styles from './SearchBar.module.css'

const SearchBar = () => {
  const {query, setQuery, error} = useGlobalContext()

  return (
    <form className={styles['search-bar']} onSubmit={(e) => e.preventDefault()}>
      <h2>Search for movies</h2>
      <input type="text" className={styles['form-input']} value={query} onChange={(e) => setQuery(e.target.value)}/>
      {error.show && <div className={styles.error}>{error.msg}</div>}
    </form>
  )
}

export default SearchBar