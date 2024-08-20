import { movies$ } from "../data/mock-data";
import { useEffect, useState } from "react";
import { Movie } from "../types"
import MovieCard from "./MovieCard"

export default function MovieList() {

    const [movies, setMovies] = useState<Movie[]>([])

    const deleteMovie = (id: number) => {
        const updatedMovies = [... movies];
        const index = movies.findIndex(movie => movie.id === id);
        updatedMovies.splice(index, 1);
        setMovies(updatedMovies);    
    }

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
        <div className={"gap-2 grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))]"}>
            {
                movies.length > 0 ?
                    
                    movies.map((movie) => 
                        <MovieCard key={movie.id} movie={movie} deleteMovie={deleteMovie} />
                    )
                    : "loading"
            }
        </div>
    )
}