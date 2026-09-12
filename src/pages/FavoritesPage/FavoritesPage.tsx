import type { Movie } from '../../types/Movie';
import { MovieCard } from '../../components/MovieCard/MovieCard';

type Props = {
  favorites: Movie[];
  onRemoveFromFavorites: (movieId: number) => void;
};

export const FavoritesPage = ({
  favorites,
  onRemoveFromFavorites,
}: Props) => {
  return (
    <div className="page-container">
      <h1>Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorite movies yet</p>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={true}
              onAddToFavorites={() => {}}
              onRemoveFromFavorites={onRemoveFromFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};