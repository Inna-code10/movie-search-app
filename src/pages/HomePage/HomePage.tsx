import type { Movie } from '../../types/Movie';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { SortMovies } from '../../components/SortMovies/SortMovies';
import './HomePage.css';

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
  sortBy: string;
  onSortChange: (value: string) => void;
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
  sortBy,
  onSortChange,
}: Props) => {
  const sortedMovies = [...movies].sort((movieA, movieB) => {
    switch (sortBy) {
      case 'rating-desc':
        return movieB.vote_average - movieA.vote_average;

      case 'rating-asc':
        return movieA.vote_average - movieB.vote_average;

      case 'newest':
        return (
          new Date(movieB.release_date).getTime() -
          new Date(movieA.release_date).getTime()
        );

      case 'oldest':
        return (
          new Date(movieA.release_date).getTime() -
          new Date(movieB.release_date).getTime()
        );

      case 'title':
        return movieA.title.localeCompare(movieB.title);

      default:
        return 0;
    }
  });

  return (
    <div className="page-container">
      <h1 className="page-title">Movie Search App</h1>

      <SearchForm onSearch={onSearch} />

      <div className="home-controls">
        <p className="favorites-count">
          <span>Favorites:</span> {favorites.length}
        </p>

        <SortMovies
          sortBy={sortBy}
          onSortChange={onSortChange}
        />
      </div>

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
          {sortedMovies.map((movie) => {
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

