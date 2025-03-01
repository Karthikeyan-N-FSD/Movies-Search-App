import { useContext, useEffect } from 'react';
import { MovieContext } from './MovieContext';
import { Link } from 'react-router';
import { HeartIcon } from '@heroicons/react/24/solid';

function MovieCard({ movie }) {
    const { favorites, setFavorites } = useContext(MovieContext);
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

    const handleFavorite = () => {
        let updatedFavorites;

        if (isFavorite) {
            // Remove movie from favorites
            updatedFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
        } else {
            // Add movie to favorites
            updatedFavorites = [...favorites, movie];
        }


        setFavorites(updatedFavorites);
    };

    return (
        <div className="border bg-white rounded shadow p-2 flex flex-col justify-between hover:shadow-md relative">
            <Link to={`/movie/${movie.imdbID}`}>
                <img
                    src={
                        movie.Poster !== 'N/A'
                            ? movie.Poster
                            : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                    }
                    alt={movie.Title}
                    className="w-full h-64 object-contain mb-2 rounded"
                />
                <div className="mt-auto flex justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">{movie.Title}</h2>
                        <p>Year: {movie.Year}</p>
                        <p>Type: {movie.Type}</p>
                    </div>
                </div>
            </Link>
            <HeartIcon
                onClick={handleFavorite}
                className={`w-10 bottom-2 right-2 absolute ${isFavorite ? 'text-red-500' : 'text-green-500'
                    }`}
            />
        </div>
    );
}

export default MovieCard;