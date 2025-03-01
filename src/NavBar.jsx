import { useContext, useState } from 'react';
import { MovieContext } from './MovieContext';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';


function NavBar() {

  const {
    query,
    setQuery,
    type,
    setType,
    handleSearch,
    favorites,
    setMovies,
    setIsFavorites,
  } = useContext(MovieContext);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(1);
    setIsFavorites(false);
    navigate('/');
  };

  const handleFavoritesClick = () => {
    setIsFavorites(true);
    setMovies(favorites);
  };

  return (
    <nav className="flex gap-1 justify-between items-center mb-1">
      <Link to="/"><img className="h-12" src="/navLogo.png"></img></Link>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-[70%]">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border w-full p-2 rounded bg-white"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded bg-white"
        >
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>
      <Link to="/" ><button onClick={handleFavoritesClick} className="bg-green-500 text-white p-2 rounded cursor-pointer">Favorites</button></Link>
    </nav>
  )
}

export default NavBar