export interface Movie {
    id: number;
    title: string;
    category: string;
    likes: number;
    dislikes: number;
    posterUrl?: string;
}
export interface MovieCardProps {
    movie: Movie;
    deleteMovie: (id: number) => void;
}
export interface MovieListProps {
    itemsPerPage: 4 | 8 | 12;
}
export interface SelectCategoryProps {
    categories: string[];
    handleCategoryChange: (category: string) => void;
}
export interface SelectPageProps{
    totalPages: number,
    currentPage: number,
    setCurrentPage: (number: number) => void;
}