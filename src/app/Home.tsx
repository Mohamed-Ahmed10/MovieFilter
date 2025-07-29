'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchMovies } from "@/lib/api";
import { Movie, MoviesResponse } from '@/types/movie';
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [movies, setMovies] = useState<MoviesResponse>({} as MoviesResponse);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');

    useEffect(() => {
        if (!search) return;

        setSearchValue(search);
        const getData = async () => {
            setLoading(true);
            const data = await fetchMovies(search, page);
            setMovies(data || []);
            setLoading(false);
        };

        getData();
    }, [search, page]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!searchValue.trim()) return;
        router.push(`/?search=${searchValue.trim()}&page=1`);
    }

    function reset() {
        setSearchValue('');
        setMovies({} as MoviesResponse);
        setLoading(false);
        router.push('/', { scroll: false });
    }

    return (
        <main className="container py-10 mx-auto px-4">
            <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-6">
                <Input
                    placeholder="Search for a movie..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button type="submit">Search</Button>
                <Button type="button" variant="ghost" onClick={reset}>
                    Reset
                </Button>
            </form>


            {loading && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-80 w-full rounded-xl" />
                    ))}
                </div>
            )}


            {!loading && !search && (
                <div className="text-center text-muted-foreground py-10 text-sm">
                    Try to search for a movie.
                </div>
            )}


            {!loading && search && movies?.Error && (
                <div className="text-center text-muted-foreground py-10 text-sm">
                    <span className="font-medium">Try to search with another word may be to much results or no results.</span>
                </div>
            )}


            {!loading && Array.isArray(movies?.Search) && movies.Search.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {movies.Search.map((movie: Movie) => (
                        <Card
                            key={movie.imdbID}
                            className="transition-transform duration-300 ease-in-out hover:scale-105"
                        >
                            <Link href={`/movie/${movie.imdbID}`}>
                                <CardContent className="relative h-80 overflow-hidden">
                                    <Image
                                        src={movie.Poster !== "N/A" ? movie.Poster : "/images/placeholder.svg"}
                                        alt={movie.Title}
                                        fill
                                        className="object-cover"
                                    />
                                </CardContent>
                                <CardHeader className="bg-blue-500/80 py-2 text-white">
                                    <CardTitle className="text-sm">{movie.Title}</CardTitle>
                                </CardHeader>
                            </Link>
                        </Card>
                    ))}
                </div>
            )}
        </main>
    );
}
