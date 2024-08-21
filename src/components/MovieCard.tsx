import { MovieCardProps } from '../types';
import { useEffect, useState } from 'react';

export default function MovieCard({ movie, deleteMovie }: MovieCardProps){
    const [posterUrl, setPosterUrl] = useState<string | null>(null)

    const computeRating = (likes: number, dislikes: number): {display: string, likeBarWidth: number} => {
        const rating = (likes/(likes+dislikes))
        return ({
            display: (rating*10).toFixed(1),
            likeBarWidth: rating*100
        })
    }

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
        <div className = "aspect-[2/3] bg-cover rounded-md hover:scale-105 transition-all overflow-hidden relatvie" style={{backgroundImage: `url(${posterUrl})`}}>
        <div
            className="absolute inset-0 rounded-md px-2 py-3 flex flex-col justify-between"
            style={{
            background: `linear-gradient(rgba(0,0,0,0.1) 35%, black 95%)`,
            }}
        > 
         <button className='invisible hover:visible' onClick={() => deleteMovie(movie.id)}>X</button>
         <div className='flex flex-col'>
            <div className='text-sm text-white font-semibold'>{movie.title}</div>
            <div className='text-xs text-gray-400'>{movie.category}</div>
            <div className='flex items-center mt-2 gap-2'>
                <div className='relative rounded grow bg-gray-200 h-1'>
                    <div className='absolute inset-0 rounded h-full' style={{boxShadow: '1px 1px 1px rgba(255,255,255,0.75) inset', background: "linear-gradient(90deg, #5123CF, #F52C9A)", width:`${computeRating(movie.likes, movie.dislikes).likeBarWidth}%`}}></div>
                </div>
                <div className='text-white text-xs font-bold w-6'>{computeRating(movie.likes, movie.dislikes).display}</div>
            </div>

        </div>
        </div>
           
        </div>
    )
}