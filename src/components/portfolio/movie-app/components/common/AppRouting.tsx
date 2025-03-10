import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage.component";
import MovieDetails from "../MovieDetails";

function AppRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/movie-app" element={<HomePage />} />
        <Route path="/movie-app/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouting;
