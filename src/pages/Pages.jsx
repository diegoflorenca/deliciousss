import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Cuisine from "./Cuisine";
import SearchResults from "./SearchResults";
import Recipe from "./Recipe";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cuisine/:type" element={<Cuisine />} />
      <Route path="/search/:input" element={<SearchResults />} />
      <Route path="/recipe/:uri" element={<Recipe />} />
    </Routes>
  );
}
export default Pages;
