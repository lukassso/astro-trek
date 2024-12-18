import HackerNewsStories from "./components/HackerNewsStories";
import { AppProvider } from "@/features/hacker-news/context";
import Pagination from "./components/Pagination";
import Search from "./components/Search";

const HackerNewsRoot = () => (
  <AppProvider>
    <Search />
    <Pagination />
    <HackerNewsStories />
  </AppProvider>
);
export default HackerNewsRoot;
