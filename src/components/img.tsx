"use client"

import type { Movie } from "@/types/movie";
import Image from "next/image";

interface Props {
    item: Movie;
}

export default function MovieImage({ item }: Props) {
    return (
        <Image
            src={item.Poster !== "N/A" ? item.Poster : "/images/placeholder.svg"}
            width={100}
            height={300}
            alt={item.Title}
            className="w-16"
        />
    )
}
