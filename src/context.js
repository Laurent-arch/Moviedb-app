import React, {useState, useContext, useEffect} from 'react'

export const API_ENDPOINT = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}`;


const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({show: false, msg: ''});
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');

    const fetchMovies = async (url) => {
        setIsLoading(true)
        try {
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            
            if(data.results) {
                setMovies(data.results)
                setError({show: false, msg: ''})
            }
            else {
                setError({show: true, msg: 'Enter a movie name to display the results'})
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMovies(`${API_ENDPOINT}&query=${query}`);
    }, [query])

    return <AppContext.Provider value={{isLoading, error, movies, query, setQuery}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}