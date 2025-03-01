import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { getMovieDetails } from './omdbApi';

function MovieDetail() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setError('');
        const data = await getMovieDetails(imdbID);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchDetails();
  }, [imdbID]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-2'>
      <div className="flex flex-col md:flex-row">
        <img
          src={
            movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://via.placeholder.com/300x445?text=No+Image'
          }
          alt={movie.Title}
          className="w-full md:max-w-lg object-contain rounded mb-4 md:mb-0 md:mr-4"
        />
        <div className="flex flex-col gap-y-1">
          <h1 className="text-3xl font-bold mb-1">{movie.Title}</h1>
          <p>
            <strong>Type:</strong> {movie.Type}
          </p>
          <p>
            <strong>Year:</strong> {movie.Year}
          </p>
          <p>
            <strong>Rated:</strong> {movie.Rated}
          </p>
          <p>
            <strong>Released:</strong> {movie.Released}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.Runtime}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Writer:</strong> {movie.Writer}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Language:</strong> {movie.Language}
          </p>
          <p>
            <strong>Country:</strong> {movie.Country}
          </p>
          <p>
            <strong>Awards:</strong> {movie.Awards}
          </p>
          <div className="mt-1">
            <strong>Ratings:</strong>
            <ul>
              {movie.Ratings &&
                movie.Ratings.map((rating, index) => (
                  <li key={index} className='pl-4'>
                    <span className='font-semibold'>{rating.Source}:</span> {rating.Value}
                  </li>
                ))}
            </ul>
          </div>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
        </div>
      </div>
      <Link to="/" className="text-blue-500 underline my-4 inline-block">
        &larr; Back to Search
      </Link>
    </div>
  );
}

export default MovieDetail;