import { createContext, useState, useEffect } from 'react';
import { searchMovies } from './omdbApi';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState(''); 
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const [isFavorites, setIsFavorites] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return storedFavorites;
  });
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  const handleSearch = async (page = 1) => {
    if (query.trim() === '') {
      setError('Please enter a search term.');
      setMovies([]);
      setTotalResults(0);
      return;
    }
    try {
      setError('');
      const data = await searchMovies(query, page, type);
      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults, 10));
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
      setMovies([]);
      setTotalResults(0);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        query,
        setQuery,
        type,
        setType,
        movies,
        totalResults,
        currentPage,
        error,
        handleSearch,
        favorites,
        setFavorites,
        setMovies,
        isFavorites,
        setIsFavorites,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};