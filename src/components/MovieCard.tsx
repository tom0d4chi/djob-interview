import { MovieCardProps } from '../types';
import { useEffect, useState } from 'react';

export default function MovieCard({ movie, deleteMovie }: MovieCardProps){
    const [posterUrl, setPosterUrl] = useState<string | null>(null)

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
        <div className = "aspect-[2/3] bg-cover rounded-md" style={{backgroundImage: `url(${posterUrl})`}}>
            <button onClick={() => deleteMovie(movie.id)}>delete</button>
        </div>
    )
}