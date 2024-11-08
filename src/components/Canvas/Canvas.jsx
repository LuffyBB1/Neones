import React, { useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import styled from 'styled-components';
import useImage from 'use-image';
import Label from '../Label/Label';
import ButtonUpload from '../Buttons/ButtonUpload';
import RadioButtons from '../Buttons/RadioButtons';
import Pared1 from '../../assets/images/pared1.jpg';
import Pared2 from '../../assets/images/pared2.jpg';
import Pared3 from '../../assets/images/pared3.jpg';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const backgroundImages = [
  { src: Pared1, label: 'Fondo 1' },
  { src: Pared2, label: 'Fondo 2' },
  { src: Pared3, label: 'Fondo 3' },
];

const cutOptions = [
  { value: "option1", label: "RECTANGULAR" },
  { value: "option2", label: "RECTANGULAR CON BORDES" },
  { value: "option3", label: "CIRCULAR" },
  { value: "option4", label: "SILUETA" }
];

const suportOptions = [
  { value: "option1", label: "SIN SOPORTE" },
  { value: "option2", label: "CON TORNILLOS" },
  { value: "option3", label: "COLGADO" },
  { value: "option4", label: "CON PATAS" }
];

const useOptions = [
  { value: "option1", label: "INTERIOR" },
  { value: "option2", label: "EXTERIOR (PROTECIÓN)" }
];

const Canvas = () => {
  const [backgroundSrc, setBackgroundSrc] = useState(null);
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);

  const [backgroundImage] = useImage(backgroundSrc);
  const [uploadedImage] = useImage(uploadedImageSrc);

  const handleUpload = (src) => {
    setUploadedImageSrc(src);
  };

  return (
    <Container>
      <Column>
        <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
          <Layer>
            {/* Capa de fondo */}
            {backgroundImage && (
              <KonvaImage
                image={backgroundImage}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
              />
            )}
          </Layer>
          <Layer>
            {/* Capa para la imagen cargada */}
            {uploadedImage && (
              <KonvaImage
                image={uploadedImage}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
              />
            )}
          </Layer>
        </Stage>
        {/* Selección de imágenes predeterminadas para el fondo */}
        <BackgroundSelection>
          {backgroundImages.map((bg, index) => (
            <Thumbnail
              key={index}
              src={bg.src}
              alt={bg.label}
              onClick={() => setBackgroundSrc(bg.src)}
              selected={backgroundSrc === bg.src}
            />
          ))}
        </BackgroundSelection>
      </Column>
      <Column>
        <ConfigSection>
          <Label title={'SVG - TEXTO'} />
          <Groups>
            <StyledInput
              type="text"
              placeholder="ESCRIBE UN TEXTO..."
            />
            <ButtonUpload onUpload={handleUpload} />
          </Groups>
        </ConfigSection>
        <ConfigSection>
          <Label title={'TAMAÑO'} />
          <Groups>
            <StyledInput
              type="text"
              placeholder="Ancho"
            />
            <StyledInput
              type="text"
              placeholder="Alto"
            />
          </Groups>
        </ConfigSection>
        <ConfigSection>
          <Label title={'RECORTE'} />
          <RadioButtons
            options={cutOptions}
            name="cutOptions"
          />
        </ConfigSection>
        <ConfigSection>
          <Label title={'SOPORTE'} />
          <RadioButtons
            options={suportOptions}
            name="suportOptions"
          />
        </ConfigSection>
        <ConfigSection>
          <Label title={'USO'} />
          <RadioButtons
            options={useOptions}
            name="useOptions"
          />
        </ConfigSection>
        <Button>¡Comprar Ya!</Button>
      </Column>
    </Container>
  );
}

export default Canvas

// Estilos con styled-components

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const Column = styled.div`
  flex: 1;
  padding: 20px;
`;

const ConfigSection = styled.div`
  margin-bottom: 20px;
`;

const Groups = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const Button = styled.button`
  background-color: #E30613;
  width: 100%;
  height: 50px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const BackgroundSelection = styled.div`
  display: flex;
  gap: 10px;
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: ${props => (props.selected ? "2px solid red" : "2px solid transparent")};
  border-radius: 5px;
  transition: border-color 0.3s;

  &:hover {
    border-color: #aaa;
  }
`;

const StyledInput = styled.input`
  display: flex;
  text-align: center;
  border-radius: 15px; /* Bordes curvos */
  font-size: 11px;
  border: 2px solid transparent;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #ececec;
  width: 50%; /* Ancho del input */
  height: 44px;
  outline: none;

  &:focus {
    border-color: red; /* Cambia el borde a rojo cuando está enfocado */
  }
`;