
export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface MoviesResponse {
    Search?: Movie[];
    totalResults?: string;
    Response: string;
    Error?: string;
}
export interface HomeProps {
    results: Movie[];
    totalResults: number;
    searchTerm: string;
    page: number;
}
export interface Rating {
    Source: string;
    Value: string;
}

export interface MovieDetails {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}
