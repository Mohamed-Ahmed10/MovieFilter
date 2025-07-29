import { MoviesResponse } from "@/types/movie";

export async function fetchMovies(search: string, page: number = 1): Promise<MoviesResponse> {
    const res = await fetch(
        `https://www.omdbapi.com/?apikey=c1250e90&s=${encodeURIComponent(search)}&page=${page}`
    );
    const data: MoviesResponse = await res.json();
    return data;
}

export async function fetchMovieDetails(imdbID: string) {
    const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=c1250e90`);

    if (!res.ok) {
        throw new Error('Failed to fetch movie details');
    }

    const data = await res.json();

    if (data.Response === 'False') {
        throw new Error(data.Error || 'Movie not found');
    }

    return data;
}
