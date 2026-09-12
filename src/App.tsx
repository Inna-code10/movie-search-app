import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { Navigation } from './components/Navigation/Navigation';
import { MovieDetailsPage } from './pages/MovieDetailsPage/MovieDetailsPage';
import { getMovies } from './services/moviesApi';
import type { Movie } from './types/Movie';
import './App.css'


function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');

    if (!savedFavorites) {
      return [];
    }

    try {
      return JSON.parse(savedFavorites);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setError('');
      setHasSearched(true);
      setPage(1);
      setSearchQuery(query);

      const moviesFromServer = await getMovies(query, 1);

      setMovies(moviesFromServer);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextPage = () => {
    setPage(page + 1);
  };

  const goToPreviousPage = () => {
    if (page === 1) {
      return;
    }

    setPage(page - 1);
  };

  const addToFavorites = (movie: Movie) => {
    const isAlreadyFavorite = favorites.some(
      (favorite) => favorite.id === movie.id
    );

    if (isAlreadyFavorite) {
      return;
    }

    setFavorites([...favorites, movie]);
  };

  const removeFromFavorites = (movieId: number) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== movieId
    );

    setFavorites(updatedFavorites);
  };

  return ( 
  <>
    <Navigation />

    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            movies={movies}
            isLoading={isLoading}
            error={error}
            hasSearched={hasSearched}
            favorites={favorites}
            onSearch={handleSearch}
            onAddToFavorites={addToFavorites}
            onRemoveFromFavorites={removeFromFavorites}
            page={page}
            onNextPage={goToNextPage}
            onPreviousPage={goToPreviousPage}
          />
        }
      />

      <Route
        path="/favorites"
        element={
          <FavoritesPage
            favorites={favorites}
            onRemoveFromFavorites={removeFromFavorites}
          />
        }
        />
        <Route
          path="/movie/:id"
          element={<MovieDetailsPage/>}
        />
    </Routes>
  </>
  );
}

export default App
