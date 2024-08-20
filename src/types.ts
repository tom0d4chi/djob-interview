export interface Movie {
    id: number;
    title: string;
    category: string;
    likes: number;
    dislikes: number;
}
export interface MovieCardProps {
    movie: Movie;
    deleteMovie: (id: number) => void;
}
export interface SelectCategoryProps {
    categories: string[];
    selectedCategory: string;
    handleCategoryChange: (category: string) => void;
}

