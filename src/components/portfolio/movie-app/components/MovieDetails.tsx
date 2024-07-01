import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CollapsibleTrigger, Collapsible } from "@/components/ui/collapsible";
import placeholderImage from "@/assets/placeholder.svg";
import LoadingOverlay from "./common/LoadingOverlay";
import { useMovieDetails } from "@/features/movie-app/hooks";
import { DEFAULT_ID } from "@/features/movie-app/const";

const MovieDetails = () => {
	const { id = `${DEFAULT_ID}` } = useParams<{ id: string }>();
	const { data: movie, isLoading, error } = useMovieDetails(id);
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate(-1);
	};

	if (isLoading) {
		return <LoadingOverlay />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!movie || movie.length === 0) {
		return <div>No movie details found</div>;
	}

	return (
		<div className="bg-muted/40 movie-details flex min-h-screen w-full flex-col">
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
					<div>
						<Button onClick={handleBackClick}>Back</Button>
					</div>
					<Card x-chunk="dashboard-06-chunk-0">
						<CardContent>
							<div>
								<div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
									<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
										<div>
											<img
												alt="Movie Poster"
												className="h-auto w-full rounded-lg shadow-lg"
												height={600}
												src={movie.Poster !== "N/A" ? movie.Poster : placeholderImage}
												style={{
													aspectRatio: "400/600",
													objectFit: "cover",
												}}
												width={400}
											/>
										</div>
										<div>
											<h1 className="mb-2 text-4xl font-bold sm:text-5xl">{movie.Title}</h1>
											<p className="mb-4 text-lg text-gray-400">
												{movie.Genre}, {movie.Year}
											</p>
											<div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
												<div>
													<p className="mb-1 text-sm text-gray-400">Release Date</p>
													<p>{movie.Released}</p>
												</div>
												<div>
													<p className="mb-1 text-sm text-gray-400">Runtime</p>
													<p>{movie.Runtime}</p>
												</div>
											</div>
											<div className="mb-8 sm:text-lg">
												<Collapsible>
													<CollapsibleTrigger asChild>
														<div className="flex w-full items-center justify-between text-left">
															<p className="text-gray-400">{movie.Plot}</p>
														</div>
													</CollapsibleTrigger>
												</Collapsible>
											</div>
											<div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
												<div>
													<p className="mb-1 text-sm text-gray-400">Director</p>
													<p>{movie.Director}</p>
												</div>
												<div>
													<p className="mb-1 text-sm text-gray-400">Writer</p>
													<p>{movie.Writer}</p>
												</div>
											</div>
											<div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
												<div>
													<p className="mb-1 text-sm text-gray-400">Cast</p>
													<p>{movie.Actors}</p>
												</div>
												<div>
													<p className="mb-1 text-sm text-gray-400">IMDb Rating</p>
													<p>{movie.imdbRating}</p>
												</div>
											</div>
											<div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
												<div>
													<p className="mb-1 text-sm text-gray-400">Awards</p>
													<p>{movie.Awards}</p>
												</div>
												<div>
													<p className="mb-1 text-sm text-gray-400">Box Office</p>
													<p>{movie.BoxOffice}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</main>
			</div>
		</div>
	);
};

export default MovieDetails;
