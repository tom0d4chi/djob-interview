import { movies$ } from "../data/mock-data";
import { useEffect, useState } from "react";
import { Movie } from "../types"
import MovieCard from "./MovieCard"
import SelectCategory from "./SelectCategory";

export default function MovieList() {

    const [movies, setMovies] = useState<Movie[]>([])
    const [categories, setCategories] = useState<string[]>([])

    const deleteMovie = (id: number) => {
        let updatedMovies = [... movies];
        let updatedCategories = [... categories];

        const index = movies.findIndex(movie => movie.id === id);
        const movieCategory = movies.find(movie => movie.id === id)?.category;
        let isCategoryInMovies = false;

        updatedMovies.splice(index, 1);

        updatedMovies.forEach(movie => {
            if (movie.category === movieCategory){
                isCategoryInMovies = true;
            }
        })

        if(!isCategoryInMovies){
            updatedCategories = updatedCategories.filter(category => category !== movieCategory)
        }
        
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