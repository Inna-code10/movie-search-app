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
  const [totalPages, setTotalPages] = useState(0);
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

      setMovies(moviesFromServer.results);
      setTotalPages(moviesFromServer.total_pages);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextPage = () => {
    setPage(page + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const goToPreviousPage = () => {
    if (page === 1) {
      return;
    }

    setPage(page - 1);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const loadPage = async () => {
      try {
        setIsLoading(true);
        setError('');

        const moviesFromServer = await getMovies(searchQuery, page);
        
        setMovies(moviesFromServer.results);
        setTotalPages(moviesFromServer.total_pages);
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPage();
  }, [searchQuery, page]);

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

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');

    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem(
      'theme',
      isDarkTheme ? 'dark' : 'light'
    );
  }, [isDarkTheme]);

  return ( 
  <div className={isDarkTheme ? 'app dark-theme' : 'app light-theme'}>
    <Navigation />
      
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setIsDarkTheme(!isDarkTheme)}
    >
      <span>{isDarkTheme ? '🌙 Dark' : '☀️ Light'}</span>

      <span className="theme-toggle__switch">
        <span className="theme-toggle__circle" />
      </span>
    </button>  

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
            totalPages={totalPages}
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
  </div>
  );
}

export default App
