'use client';

import { fetchMovieDetails } from "@/lib/api";
import { MovieDetails } from '@/types/movie';
import { use, useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export default function Page({ params }: { params: Promise<{ movie_details: string }> }) {
  const { movie_details } = use(params);

  const [movie, setMovie] = useState<MovieDetails>({} as MovieDetails);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(movie_details);
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie details", err);
        setMovie({} as MovieDetails);
      }
      setLoading(false);
    };

    if (movie_details) getMovieDetails();
  }, [movie_details]);

  if (loading) {
    return (
      <div className="container py-10 mx-auto px-4">
        <Skeleton className="h-96 w-full rounded-xl mb-6" />
        <Skeleton className="h-6 w-1/3 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
      </div>
    );
  }

  return (
    <div className="container py-10 mx-auto">
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Poster */}
          <div className="relative w-full aspect-[2/3] md:h-full">
            <Image
              src={
                movie.Poster && movie.Poster !== "N/A"
                  ? movie.Poster
                  : "/images/placeholder.svg"
              }
              alt={movie.Title}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="col-span-2 p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl mb-2">{movie.Title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">{movie.Year} • {movie.Runtime} • {movie.Genre}</CardDescription>
            </CardHeader>

            <div className="flex flex-wrap gap-2 mb-4">
              {movie.Genre?.split(', ').map((genre, i) => (
                <Badge key={i} variant="secondary">{genre}</Badge>
              ))}
            </div>

            <Separator className="mb-4" />

            <CardContent className="p-0 space-y-2 text-sm">
              <p><strong>Director:</strong> {movie.Director}</p>
              <p><strong>Writer:</strong> {movie.Writer}</p>
              <p><strong>Actors:</strong> {movie.Actors}</p>
              <p><strong>Language:</strong> {movie.Language}</p>
              <p><strong>Country:</strong> {movie.Country}</p>
              <p><strong>Released:</strong> {movie.Released}</p>
              <p><strong>Rated:</strong> {movie.Rated}</p>
              <p><strong>Awards:</strong> {movie.Awards}</p>
              <p><strong>Box Office:</strong> {movie.BoxOffice}</p>

              <Separator className="my-4" />

              <p><strong className="block mb-1">Plot:</strong>{movie.Plot}</p>

              <Separator className="my-4" />

              {movie.Ratings?.length > 0 && (
                <div>
                  <p className="mb-2 font-medium">Ratings:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {movie.Ratings.map((r, i) => (
                      <li key={i}>{r.Source}: {r.Value}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
