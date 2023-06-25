import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SearchResults() {
  const { input } = useParams();
  const [recipes, setRecipes] = useState([]);
  const getSearch = async (input) => {
    // TODO: add try catch block here
    const api = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_API_KEY}&q=${input}`
    );
    const data = await api.json();
    setRecipes(data.hits);
  };

  useEffect(() => {
    getSearch(input);
  }, [input]);

  return (
    <div>
      <h1>Search Results</h1>
      {recipes.map((item) => {
        const recipe = item.recipe;
        return (
          <div key={recipe.uri}>
            <p>{recipe.label}</p>
            <img src={recipe.image} alt={recipe.label} />
          </div>
        );
      })}
    </div>
  );
}

export default SearchResults;
