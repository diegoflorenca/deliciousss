import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

function Search() {
  return (
    <FormStyle>
      <div>
        <FaSearch />
        <input type="text" />
      </div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  margin: 0rem 2rem;

  div {
    position: relative;
    width: 100%;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949 0%, #313131 100%);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 100%;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 1%;
    transform: translate(50%, -50%);
    color: white;
  }
`;

export default Search;
