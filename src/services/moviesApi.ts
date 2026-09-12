import type { Movie } from "../types/Movie";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const getMovies = async (
  query: string,
  page: number,
): Promise<Movie[]> => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=${page}`;
  
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

  const data = await response.json();

  return data.results;
};

export const getMovieById = async (id: string): Promise<Movie> => {
  const url = `https://api.themoviedb.org/3/movie/${id}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }

  const data = await response.json();

  return data;
};