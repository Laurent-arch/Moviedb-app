import React, { useState, useContext, useEffect } from 'react';

export const API_ENDPOINT = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}`;

interface ContextProps {
    isLoading: boolean;
    error: { show: boolean; msg: string };
    movies: any[];
    query: string;
    setQuery: (query: string) => void;
}

const AppContext = React.createContext<ContextProps | undefined>(undefined);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({ show: false, msg: '' });
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');

    const fetchMovies = async (url: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if (data.results) {
                setMovies(data.results);
                setError({ show: false, msg: '' });
            } else {
                setError({ show: true, msg: 'Enter a movie name to display the results' });
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMovies(`${API_ENDPOINT}&query=${query}`);
    }, [query]);

    return (
        <AppContext.Provider value={{ isLoading, error, movies, query, setQuery }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a AppProvider');
    }
    return context;
};

export { AppContext, AppProvider };