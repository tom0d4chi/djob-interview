import { MovieCardProps } from '../types';
import { useEffect, useState } from 'react';
import { computeRating } from '../utils/utils';

export default function MovieCard({ movie, deleteMovie }: MovieCardProps){
    const [posterUrl, setPosterUrl] = useState<string | null>(null)
    const [isHovered, setIsHovered] = useState<boolean>(false)


    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmQyZjMxNGQ4ZGVhZWU4MGFlMTQ3YjYxODI5MWJmOCIsIm5iZiI6MTcyNDE0OTY1NS4wMDQ5ODUsInN1YiI6IjY2YzNhMmExODE4YmQ2M2Q3YjcxMDFjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BfbxaxwOTNa31oKv-Spy7Dxi1H3HcrT9Gn8zjnOP7Us'
            }
          };
          

        const fetchPoster = async () => {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURI(movie.title)}&include_adult=false&language=fr-FR&page=1`, options)
                .then(response => response.json())
                .then(response => setPosterUrl(`https://image.tmdb.org/t/p/w500/${response.results[0].poster_path}`))
                .catch(err => console.error(err));
        };

        fetchPoster()
    }, [])

    return(
        <div>
            <div className = {`${isHovered ? 'blur-xl' : 'blur-none'} aspect-[2/3] -z-20 rounded-lg scale-90 transition-all duration-200 absolute inset-0`} style={{backgroundImage: `url(${posterUrl})`}} />

            <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className = "hover:scale-105 z-0 aspect-[2/3] bg-cover rounded-lg transition-all relative" style={{backgroundImage: `url(${posterUrl})`}}>
            <div
                className="absolute inset-0 rounded-lg px-2 pb-3 pt-2 flex flex-col justify-between"
                style={{
                background: `linear-gradient(rgba(0,0,0,0.1) 35%, black 95%)`,
                }}
            > 
            <div className='self-end h-6 w-6 flex items-center justify-center'>
                <button className= {`${isHovered ? 'visible opacity-100 h-6 w-6 text-white' : 'invisible opacity-0 h-0 w-0'} transition-all rounded-full bg-black flex items-center justify-center overflow-hidden`} onClick={() => deleteMovie(movie.id)}>x</button>
            </div>
            <div className='flex flex-col'>
                <div className='text-sm text-white font-semibold'>{movie.title}</div>
                <div className='text-xs text-gray-400'>{movie.category}</div>
                <div className='flex items-center mt-1 gap-2'>
                    <div className='relative rounded grow bg-gray-200 h-1'>
                        <div className='absolute inset-0 rounded h-full' style={{boxShadow: '0px 1px 2px rgba(255,255,255,0.7) inset', background: "linear-gradient(90deg, #5123CF, #F52C9A)", width:`${computeRating(movie.likes, movie.dislikes).likeBarWidth}%`}}></div>
                    </div>
                    <div className='text-white text-xs font-black flex justify-end '>{computeRating(movie.likes, movie.dislikes).display}</div>
                </div>

            </div>
            </div>
            
            </div>
        </div>
    )
}