import styled from "styled-components";
// import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Cuisine() {
  const [recipes, setRecipes] = useState([]);
  const { type } = useParams();

  const getCuisine = async (type) => {
    const data = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_API_KEY}&cuisineType=${type}&random=true`
    );

    const recipes = await data.json();
    console.log(recipes);
    setRecipes(recipes.hits);
  };

  useEffect(() => {
    getCuisine(type);
  }, [type]);

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

export default Cuisine;
