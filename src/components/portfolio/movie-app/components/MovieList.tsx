import { Link } from "react-router-dom";
import placeholderImage from "@/assets/placeholder.svg";
import type { MovieListProps } from "@/features/movie-app/types";

const MovieList = ({ data }: MovieListProps) => {
  if (!data) return <div>No movies found</div>;

  return (
    <div className="xs:grid-cols-1 movie-list grid sm:grid-cols-2 xl:grid-cols-4 ">
      {data?.map((movie) => (
        <div
          key={movie.imdbID}
          className="movie-item flex flex-col items-center justify-between p-6"
        >
          <Link to={`/movie-app/${movie.imdbID}`}>
            <img
              className="glow-wrapper rounded-lg"
              src={(movie.Poster !== "N/A" ? movie.Poster : placeholderImage) as string}
              width={300}
              height={500}
              alt={`${movie.Title} Poster`}
            />
          </Link>
          <div>
            <p className="mt-2">{movie?.Title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
