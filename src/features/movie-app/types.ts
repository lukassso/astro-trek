export type MovieType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Genre: string;
  Poster: string;
  Released?: string;
  Runtime?: string;
  Plot?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  imdbRating?: string;
  Awards?: string;
  BoxOffice?: string;
};
export interface SearchBarProps {
  onSearch: (query: string) => void;
  defaultValue: string;
}

export interface MovieListProps {
  data: MovieType[];
}

export interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
