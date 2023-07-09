import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

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
    <Grid>
      {recipes.map((item) => {
        const recipe = item.recipe;
        return (
          <Card key={recipe.uri}>
            <Link to={`/recipe/${encodeURIComponent(recipe.uri)}`}>
              <img src={recipe.image} alt={recipe.label} />
              <h4>{recipe.label}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default SearchResults;
