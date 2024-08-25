import { movies$ } from "../data/mock-data";
import Movie from '../types'
import { gsap } from "gsap";
import { useEffect, useState, useRef } from "react";
import MovieCard from "./MovieCard"
import SelectCategory from "./SelectCategory";
import SelectPage from "./SelectPage"

export default function MovieList() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState<4 | 8 | 12>(8);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("Tout");
    
    const movieRefs = useRef<HTMLDivElement[]>([]);
    movieRefs.current = []; 

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
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


    //fetching movies
    useEffect(() => {
        const initialCategories = [...categories];
        if(!initialCategories.includes("Tout")){
            initialCategories.push("Tout")
        }

        const fetchMovies = async () => {
            //get movies from file
            const moviesData = await movies$;

            //set initial categories
            moviesData.forEach(movie => {
                if(!initialCategories.includes(movie.category)){
                    initialCategories.push(movie.category)
                }
            });
            
            setCategories(initialCategories);


            const filteredMovies = selectedCategory === 'Tout'
                ? moviesData
                : moviesData.filter(movie => movie.category === selectedCategory);

            setTotalPages(Math.ceil(filteredMovies.length/itemsPerPage));


            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedMovies = filteredMovies.slice(startIndex, endIndex);
            console.log(filteredMovies);
            setMovies(paginatedMovies);
        }

        fetchMovies();
    },[currentPage, selectedCategory]);

    //animating movie cards
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
            <div className={"gap-x-2 gap-y-6 grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))]"}>
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
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
        </>
    )
}