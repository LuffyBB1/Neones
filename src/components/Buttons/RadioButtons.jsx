import React, { useState } from "react";
import styled from "styled-components";

const RadioButtonGroup = ({ options, name, onChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Container>
      {options.map((option) => (
        <Label
          key={option.value}
          selected={selectedOption === option.value}
        >
          <StyledRadio
            type="radio"
            name={name}
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleChange}
          />
          {option.label}
        </Label>
      ))}
    </Container>
  );
};

export default RadioButtonGroup;

// Estilos con styled-components

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 11px;
  color: #777777;
  cursor: pointer;
  text-align: center;
  width: 50%; 
  height: 50px; 
  background-color: #ececec;
  border-radius: 15px;
  border: ${(props) => (props.selected ? "2px solid #E30613" : "none")};
  transition: border-color 0.3s, box-shadow 0.3s;
`;

const StyledRadio = styled.input`
  position: absolute;
  opacity: 0; 
  pointer-events: none; 
  

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(72, 172, 73, 0.5);
  }
`;
