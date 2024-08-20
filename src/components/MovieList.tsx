import { movies$ } from "../data/mock-data";
import { useEffect, useState } from "react";
import { Movie } from "../types"
import MovieCard from "./MovieCard"

export default function MovieList() {

    const [movies, setMovies] = useState<Movie[] | null>(null)

    useEffect(() => {
        const fetchMovies = async () => {
            return (
                movies$
                .then((data) => setMovies(data))
                .catch(e => console.log("Failed to load movies: ", e))
            )
        };

        fetchMovies();
    },[])
    
    return (
        <div className={"flex flex-wrap gap-2"}>
            {
                movies ?
                    
                    movies.map((movie) => 
                        <MovieCard key={movie.id} movie={movie} />
                    )
                    : "loading"
            }
        </div>
    )
}