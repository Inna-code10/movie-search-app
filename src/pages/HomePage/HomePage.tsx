import type { Movie } from '../../types/Movie';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { MovieCard } from '../../components/MovieCard/MovieCard';

type Props = {
  movies: Movie[];
  isLoading: boolean;
  error: string;
  hasSearched: boolean;
  favorites: Movie[];
  onSearch: (query: string) => void;
  onAddToFavorites: (movie: Movie) => void;
  onRemoveFromFavorites: (movieId: number) => void;
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
};

export const HomePage = ({
  movies,
  isLoading,
  error,
  hasSearched,
  favorites,
  onSearch,
  onAddToFavorites,
  onRemoveFromFavorites,
  page,
  totalPages,
  onNextPage,
  onPreviousPage,
}: Props) => {
  return (
    <div className="page-container">
      <h1>Movie Search App</h1>

      <SearchForm onSearch={onSearch} />

      <p>Favorites: {favorites.length}</p>

      {isLoading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {hasSearched &&
        !isLoading &&
        !error &&
        movies.length === 0 && (
          <p>No movies found</p>
        )}

      {!isLoading && !error && (
        <div className="movies-grid">
          {movies.map((movie) => {
            const isFavorite = favorites.some(
              (favorite) => favorite.id === movie.id
            );

            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={isFavorite}
                onAddToFavorites={onAddToFavorites}
                onRemoveFromFavorites={onRemoveFromFavorites}
              />
            );
          })}
        </div>
      )}

      {hasSearched &&
        !isLoading &&
        !error &&
        movies.length > 0 &&
        totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination__button"
            type="button"
            onClick={onPreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>

          <span className="pagination__info">
            Page {page} of {totalPages}
          </span>

          <button
            className="pagination__button"
            type="button"
            onClick={onNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};  

