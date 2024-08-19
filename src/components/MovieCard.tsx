import { Movie } from '../types'

interface MovieCardProps {
    movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps){
    return(
        <>
            {movie.title}
        </>
    )
}