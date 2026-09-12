import './MovieCard.css';
import type { Movie } from "../../types/Movie";
import { Link } from "react-router-dom";

type Props = {
  movie: Movie;
  isFavorite: boolean;
  onAddToFavorites: (movie: Movie) => void;
  onRemoveFromFavorites: (movieId: number) => void;
}

export const MovieCard = ({
  movie,
  isFavorite,
  onAddToFavorites,
  onRemoveFromFavorites,
}: Props) => {
  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        {movie.poster_path ? (
        <img
          className="movie-card__poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
          <div className="movie-card__placeholder">
             No poster available
          </div>
        )}
      </Link>
      
      <Link
        to={`/movie/${movie.id}`}
        className="movie-card__title-link"
      >
        <h2>{movie.title}</h2>
      </Link>
        
      <p className="movie-card__meta">
        {movie.release_date.slice(0, 4) || 'Unknown release date'}
      </p>

      <p className="movie-card__rating">
        ⭐ {movie.vote_average.toFixed(1)}
      </p>

      {isFavorite ? (
        <button
          type="button"
          className="favorite-button"
          onClick={() => onRemoveFromFavorites(movie.id)}
        >
          ❤️ Remove from Favorites
        </button>
      ) : (
        <button
          type="button"
          className="favorite-button"
          onClick={() => onAddToFavorites(movie)}
        >
          🤍 Add to Favorites
        </button>
      )}
    </article>
  );
};