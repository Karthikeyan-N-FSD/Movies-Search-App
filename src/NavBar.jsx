import { useContext, useState, useRef, useEffect } from 'react';
import { MovieContext } from './MovieContext';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { MicrophoneIcon } from '@heroicons/react/24/solid';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

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
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // Debounce live search
  useEffect(() => {
    if (query.trim() === "") return;
    const handler = setTimeout(() => {
      handleSearch(1);
      setIsFavorites(false);
      navigate('/');
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [query, type]); // Run when query or type changes

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

  const startListening = () => {
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setListening(false);
      };
      recognitionRef.current.onerror = () => setListening(false);
      recognitionRef.current.onend = () => setListening(false);
    }
    setListening(true);
    recognitionRef.current.start();
  };

  return (
    <nav className="flex gap-1 justify-between items-center mb-1">
      <Link to="/"><img className="h-12" src="/navLogo.png"></img></Link>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-[70%]">
        <div className="relative w-full flex">
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border w-full p-2 rounded bg-white"
          />
          <button
            type="button"
            onClick={startListening}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full`}
            aria-label="Voice Search"
            tabIndex={-1}
          >
            <MicrophoneIcon className={`h-6 w-6 ${listening ? 'text-blue-500' : 'text-gray-600'}`} aria-hidden="true" />
          </button>
        </div>
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer">
          Search
        </button>
      </form>
      <Link to="/" ><button onClick={handleFavoritesClick} className="bg-green-500 text-white p-2 rounded cursor-pointer">Favorites</button></Link>
    </nav>
  )
}

export default NavBar