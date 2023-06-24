import { useEffect, useState } from "react";

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    // TODO: add try catch block here
    const api = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_API_KEY}&diet=balanced&random=true`
    );
    const data = await api.json();
    setPopular(data.hits);
    console.log(data.hits);
  };
  return (
    <div>
      {popular.map((item) => {
        return (
          <div key={item.recipe.uri}>
            <p>{item.recipe.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Popular;
