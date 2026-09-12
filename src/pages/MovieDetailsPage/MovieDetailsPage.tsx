import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../services/moviesApi";
import type { Movie } from '../../types/Movie';

export const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadMovie = async () => {
      try {
        setIsLoading(true);
        setError('');

        const movieFromServer = await getMovieById(id);

        setMovie(movieFromServer);
      } catch {
        setError('Failed to load movie details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  return (
  <div className="page-container">
    <button
      className="back-button"
      type="button"
      onClick={() => navigate(-1)}
    >
      ← Back
    </button>  
      
    <h1>Movie Details</h1>

    {isLoading && <p>Loading...</p>}

    {error && <p>{error}</p>}

    {!isLoading && !error && movie && (
      <div className="movie-details">
        {movie.poster_path ? (
          <img
            className="movie-details__poster"  
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (  
         <p>No poster available</p>
        )}

        <div className="movie-details__info">
          <h2>{movie.title}</h2>

          <p>Release date: {movie.release_date}</p>

          <p>Rating: {movie.vote_average}</p>

          <p>{movie.overview}</p>
        </div>
      </div>
    )}
  </div>
  );
};