import { useState } from "react";
import { useMovies } from "@/features/movie-app/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MovieList from "./MovieList";
import SearchBar from "./common/SearchBar";
import PaginationComponent from "./common/PaginationComponent";
import LoadingOverlay from "./common/LoadingOverlay";

export default function HomePageComponent() {
  const [searchParam, setSearchParam] = useState("Batman");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useMovies(searchParam, currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (searchQuery: string) => {
    setSearchParam(searchQuery);
    setCurrentPage(1);
  };

  const totalPages = data?.totalResults ? Math.ceil(data.totalResults / 10) : 0;

  return (
    <div className="bg-muted/40 flex min-h-screen w-full flex-col">
      {isLoading && <LoadingOverlay />}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="galery" className="overflow-hidden">
            <div className="flex items-center">
              <SearchBar onSearch={handleSearch} defaultValue={searchParam} />
              <div className="ml-auto flex items-center gap-2">
                <TabsList className="hidden sm:flex">
                  <TabsTrigger value="galery">Galery</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </div>
            </div>
            <TabsContent value="galery">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Movies Galery</CardTitle>
                  <CardDescription>Browse a galery of our movies.</CardDescription>
                </CardHeader>
                <CardContent>
                  {error ? <div>Error: {error.message}</div> : <MovieList data={data?.Search} />}
                </CardContent>
                <CardFooter>
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="list">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Movies List</CardTitle>
                  <CardDescription>Browse a list of our movies.</CardDescription>
                </CardHeader>
                <CardContent>Movie list will be here...</CardContent>
                <CardFooter>
                  <div className="text-muted-foreground text-xs">
                    Showing <strong>1-10</strong> of <strong>32</strong> products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
