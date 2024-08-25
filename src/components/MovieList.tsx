import { movies$ } from "../data/mock-data";
import { gsap } from "gsap";
import { useEffect, useState, useRef } from "react";
import { Movie, MovieListProps } from "../types"
import MovieCard from "./MovieCard"
import SelectCategory from "./SelectCategory";
import SelectPage from "./SelectPage"

export default function MovieList({itemsPerPage}: MovieListProps) {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("Tout");
    
    const movieRefs = useRef<HTMLDivElement[]>([]);
    movieRefs.current = []; 

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
    }

    const deleteMovie = (id: number) => {
        const movieToDelete = movies.find(movie => movie.id === id);
        if (!movieToDelete) return;
    
        const updatedMovies = movies.filter(movie => movie.id !== id);
        
        const isCategoryInMovies = updatedMovies.some(movie => movie.category === movieToDelete.category);
    
        if(!isCategoryInMovies){
            const updatedCategories = categories.filter(category => category !== movieToDelete.category);
            setCategories(updatedCategories); 
            setSelectedCategory("Tout")
        }
        
        setMovies(updatedMovies);   
    }

    useEffect(() => {
        const initialCategories = [...categories];
        if(!initialCategories.includes("Tout")){
            initialCategories.push("Tout")
        }

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
    },[]);

    useEffect(() => {
        gsap.fromTo(
            movieRefs.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, stagger: 0.02, duration: 0.5, ease: "power3.out" }
        );
    }, [movies, selectedCategory]);

    const addToRefs = (el: HTMLDivElement) => {
        if (el && !movieRefs.current.includes(el)) {
            movieRefs.current.push(el);
        }
    };
    
    return (
        <>
            <SelectCategory 
                categories={categories} 
                handleCategoryChange={handleCategoryChange}
            />
            <div className={"gap-2 grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))]"}>
                {
                    movies.length > 0 ? 
                        movies.filter(movie => movie.category === selectedCategory || selectedCategory === "Tout")
                            .map((movie) => (
                                <div key={movie.id} ref={addToRefs}>
                                    <MovieCard key={movie.id} movie={movie} deleteMovie={deleteMovie} />
                                </div>
                            )
                            )
                            : "loading"
                }
            </div>
            <SelectPage 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
        </>
    )
}