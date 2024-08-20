import { movies$ } from "../data/mock-data";
import { useEffect, useState } from "react";
import { Movie } from "../types"
import MovieCard from "./MovieCard"
import SelectCategory from "./SelectCategory";

export default function MovieList() {

    const [movies, setMovies] = useState<Movie[]>([])
    const [categories, setCategories] = useState<string[]>([])

    const deleteMovie = (id: number) => {
        const movieToDelete = movies.find(movie => movie.id === id);
        if (!movieToDelete) return;
    
        const updatedMovies = movies.filter(movie => movie.id !== id);
        
        const isCategoryInMovies = updatedMovies.some(movie => movie.category === movieToDelete.category);
    
        const updatedCategories = isCategoryInMovies
            ? categories
            : categories.filter(category => category !== movieToDelete.category);
        
        setMovies(updatedMovies);   
        setCategories(updatedCategories); 
    }

    useEffect(() => {
        const initialCategories = [...categories]
        const fetchMovies = async () => {
            return (
                movies$
                .then((data) => {
                    setMovies(data);
                    return data})
                .then(data => {
                    data.forEach(movie => {
                        if(!initialCategories.includes(movie.category)){
                            initialCategories.push(movie.category)
                        }
                    });
                    setCategories(initialCategories);
                })
                .catch(e => console.log("Failed to load movies: ", e))
            )
        };
        fetchMovies();
    },[])
    
    return (
        <>
            <SelectCategory categories={categories}/>
            <div className={"p-2 gap-2 grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))]"}>
                {
                    movies.length > 0 ?
                        
                        movies.map((movie) => 
                            <MovieCard key={movie.id} movie={movie} deleteMovie={deleteMovie} />
                        )
                        : "loading"
                }
            </div>
        </>
    )
}