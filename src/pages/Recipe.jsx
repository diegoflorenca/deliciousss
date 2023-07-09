import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {
  let { uri } = useParams();
  const encodedUri = encodeURIComponent(uri);

  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("ingredients");

  useEffect(() => {
    const fetchDetails = async (encodedUri) => {
      const recipe = localStorage.getItem("recipe");
      if (recipe) {
        setDetails(JSON.parse(recipe));
      } else {
        const data = await fetch(
          `https://api.edamam.com/api/recipes/v2/by-uri?type=public&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_API_KEY}&uri=${encodedUri}`
        );
        const detailData = await data.json();
        console.log(detailData);
        setDetails(detailData.hits[0].recipe);
      }
    };
    fetchDetails(encodedUri);
  }, [encodedUri]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.label}</h2>
        <img src={details.image} alt={details.label} />
      </div>
      <Info>
        <h3>{details.cuisineType}</h3>
        <p>Calories: {details.calories}</p>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        <Button
          className={activeTab === "nutrition" ? "active" : ""}
          onClick={() => setActiveTab("nutrition")}
        >
          Nutrition
        </Button>
        {activeTab === "ingredients" && (
          <div>
            <ul>
              {details.ingredientLines.map((item) => {
                return <li key={item}>{item}</li>;
              })}
            </ul>
          </div>
        )}
        {activeTab === "nutrition" && (
          <div>
            <ul>
              {details.totalNutrients.map((item) => {
                return (
                  <li key={item}>
                    {item.label}: {item.quantity}
                    {item.unit}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949 0%, #313131 100%);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
  }

  p {
    margin-bottom: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5;
  }

  ul {
    margin-top: 2rem;
    margin-left: 1rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;
