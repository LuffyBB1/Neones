import React from "react";
import styled from "styled-components";

const ButtonUpload = ({ onUpload }) => {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "image/svg+xml") {
        const reader = new FileReader();
        reader.onload = () => {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(reader.result, "image/svg+xml");
          console.log(svgDoc);

          const layers = svgDoc.querySelectorAll("g"); // Contar etiquetas <g> para las capas
          onUpload(URL.createObjectURL(file), layers.length);
        };
        reader.readAsText(file);
      } else {
        console.log("Solo se permiten archivos SVG.");
        e.target.value = "";
      }
    }
  };

  return (
    <Container>
      <InputFile
        type="file"
        accept=".svg"
        onChange={handleFileChange}
        id="file-upload"
      />
      <Label htmlFor="file-upload">
        Subir archivo
      </Label>
    </Container>
  );
};

export default ButtonUpload;

// Estilos con styled-components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 50px;
`;

const InputFile = styled.input`
  display: none;
`;

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #ececec;
  color: #777777;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  cursor: pointer;
  font-size: 11px;
`;
