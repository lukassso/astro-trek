export const fetchMovies = async (searchParam: string, page: number) => {
  const response = await fetch(`/api/movies-api?s=${searchParam}&page=${page}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
