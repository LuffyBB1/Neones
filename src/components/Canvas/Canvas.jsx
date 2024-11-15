import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Text, Image as KonvaImage, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';
import styled from 'styled-components';
import useImage from 'use-image';
import Slider from "react-slick";
import Label from '../Label/Label';
import ButtonUpload from '../Buttons/ButtonUpload';
import RadioButtons from '../Buttons/RadioButtons';
import Pared1 from '../../assets/images/pared1.jpg';
import Pared2 from '../../assets/images/pared2.jpg';
import Pared3 from '../../assets/images/pared3.jpg';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

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
  { value: "option2", label: "EXTERIOR (PROTECCIÓN)" }
];

const Canvas = () => {
  const [backgroundSrc, setBackgroundSrc] = useState(null);
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [backgroundImage] = useImage(backgroundSrc);
  const [uploadedImage] = useImage(uploadedImageSrc);
  const [layerCount, setLayerCount] = useState(0); // Estado para las capas

  const [imageAttrs, setImageAttrs] = useState({
    x: CANVAS_WIDTH / 2 - 50,
    y: CANVAS_HEIGHT / 2 - 50,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    width: 100, // Ajuste inicial del ancho
    height: 100, // Ajuste inicial de la altura
  });

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 4,
    slidesToShow: 4
  };

  const imageRef = useRef(null);
  const transformerRef = useRef(null);

  const handleUpload = (src, layers) => {
    setUploadedImageSrc(src);
    setLayerCount(layers);
  };

  const handleDragMove = (e) => {
    const { x, y } = e.target.attrs;
    setImageAttrs((prev) => ({ ...prev, x, y }));
  };

  const handleTransform = () => {
    const node = imageRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const width = node.width() * scaleX;
    const height = node.height() * scaleY;

    const limitedWidth = Math.min(width, CANVAS_WIDTH);
    const limitedHeight = Math.min(height, CANVAS_HEIGHT);

    setImageAttrs((prev) => ({
      ...prev,
      width: limitedWidth,
      height: limitedHeight,
    }));

    node.scale({ x: 1, y: 1 }); // Restablecer la escala para evitar escalado acumulado
  };

  useEffect(() => {
    if (imageRef.current && transformerRef.current) {
      transformerRef.current.nodes([imageRef.current]);
    }
  }, [uploadedImage]);

  return (
    <Container>
      <Column>
        <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{ borderRadius: '10px', overflow: 'hidden' }}>
          <Layer>
            {backgroundImage && (
              <KonvaImage
                image={backgroundImage}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
              />
            )}
            <Html
              divProps={{
                style: {
                  position: 'absolute',
                  top: 'unset',
                  bottom: 0,
                  height: '100px'
                }
              }}
            >
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
            </Html>
          </Layer>
          <Layer>
            {uploadedImage && (
              <KonvaImage
                image={uploadedImage}
                x={imageAttrs.x}
                y={imageAttrs.y}
                width={imageAttrs.width}
                height={imageAttrs.height}
                draggable
                ref={imageRef}
                onDragMove={handleDragMove}
                onTransformEnd={handleTransform}
                dragBoundFunc={(pos) => {
                  const newX = Math.max(0, Math.min(CANVAS_WIDTH - imageAttrs.width, pos.x));
                  const newY = Math.max(0, Math.min(CANVAS_HEIGHT - imageAttrs.height, pos.y));
                  return {
                    x: newX,
                    y: newY,
                  };
                }}
              />
            )}
            {uploadedImage && (
              <Transformer
                ref={transformerRef}
                borderStroke='#BC13FE'
                borderStrokeWidth={2}
                borderDash={[10, 5]}
                anchorFill="white"
                anchorStroke="#BC13FE"
                anchorCornerRadius={50}
                enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                anchorSize={13}
                anchorDragBoundFunc={(oldPos, newPos) => {
                  const minX = 0;
                  const minY = 0;
                  const maxX = CANVAS_WIDTH;
                  const maxY = CANVAS_HEIGHT;
                  return {
                    x: Math.max(minX, Math.min(maxX, newPos.x)),
                    y: Math.max(minY, Math.min(maxY, newPos.y)),
                  };
                }}
              />
            )}
          </Layer>
        </Stage>
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
          <Label title={'CAPAS'} />
          <p>Número de capas: {layerCount}</p>
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
};

export default Canvas;

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
  padding: 10px;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  cursor: pointer;
  border: ${props => (props.selected ? "2px solid #BC13FE" : "2px solid transparent")};
  border-radius: 5px;
  transition: border-color 0.3s;
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
    border-color: #E30613; /* Cambia el borde a rojo cuando está enfocado */
  }
`;
