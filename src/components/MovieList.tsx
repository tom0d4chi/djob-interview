import { movies$ } from "../data/mock-data";
import { useEffect, useState } from "react";

export default function MovieList() {

    const [movies, setMovies] = useState(null)
    useEffect(() => {
        movies$
            .then(data => setMovies(data))
            .catch(e => console.log("Failed to load movies: ", e))
    }, )
    
    return (
        <>
            {
                movies ?
                    movies.map((movie) => 
                        <li key={movie.id}>
                            {movie.title}
                        </li>
                    )
                    : "loading"
            }
        </>
    )
}