import { useContext } from 'react';
import { MovieContext } from './MovieContext';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import { Link } from 'react-router';



function SearchPage() {
    const {
        movies,
        totalResults,
        currentPage,
        error,
        handleSearch,
        isFavorites,
        setIsFavorites,
    } = useContext(MovieContext);



    const totalPages = Math.ceil(totalResults / 10);

    return (
        <div className='container mx-auto'>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {movies && movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))
                ) : (
                    !error && <div>No results found.</div>
                )}
            </div>

            {isFavorites ? (
                <button onClick={() => { setIsFavorites(false), handleSearch(currentPage) }} className="text-blue-500 underline my-4 inline-block cursor-pointer">
                    &larr; Back to Search
                </button>
            ) : (
                <div>
                    {totalResults > 10 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => handleSearch(page)}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchPage;