import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/features/movie-app/fetchMovies";
import { fetchMovieDetails } from "@/features/movie-app/fetchMovieDetails";

export const useMovies = (searchParam: string, page: number) => {
  return useQuery({
    queryKey: ["movies", searchParam, page],
    queryFn: () => fetchMovies(searchParam, page),
    placeholderData: (prevData) => prevData,
    retry: 1,
    retryDelay: 0,
  });
};

export const useMovieDetails = (id: string) => {
  return useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => fetchMovieDetails(id),
    placeholderData: (prevData) => prevData,
  });
};
