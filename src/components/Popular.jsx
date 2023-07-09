import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const getPopular = async () => {
      // check if there is recipes on the local storage before fetching new ones
      const recipes = localStorage.getItem("popular");
      if (recipes) {
        setPopular(JSON.parse(recipes));
      } else {
        // TODO: add try catch block here
        const api = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_API_KEY}&diet=balanced&random=true`
        );
        const data = await api.json();
        localStorage.setItem("popular", JSON.stringify(data.hits));
        setPopular(data.hits);
      }
    };
    getPopular();
  }, []);

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 2,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "1.5rem",
          }}
        >
          {popular.map((item) => {
            const recipe = item.recipe;
            return (
              <SplideSlide key={recipe.uri}>
                <Card>
                  <Link to={`/recipe/${encodeURIComponent(recipe.uri)}`}>
                    <p>{recipe.label}</p>
                    <img src={recipe.image} alt={recipe.label} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
`;

export default Popular;
