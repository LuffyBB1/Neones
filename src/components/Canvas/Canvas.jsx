import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Text, Image as KonvaImage, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';
import styled from 'styled-components';
import useImage from 'use-image';
// import { X } from 'lucide-react';
import Label from '../Label/Label';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RadioButtons from '../Buttons/RadioButtons';
import Pared1 from '../../assets/images/fondo1.jpeg';
import Pared2 from '../../assets/images/fondo2.jpeg';
import Pared3 from '../../assets/images/fondo3.jpeg';
import Pared4 from '../../assets/images/fondo4.jpeg';
import Pared5 from '../../assets/images/fondo5.jpeg';
import Pared6 from '../../assets/images/fondo6.jpeg';
import Pared7 from '../../assets/images/fondo7.jpeg';


const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;


const contentTypeOptions = [
  { value: "text", label: "ESCRIBE UN TEXTO" },
  { value: "image", label: "SUBIR ARCHIVO" }
];

const NEON_COLORS = [
  {
    value: '#ff3333',
    label: 'Rojo Neón',
    glow: ['#ff000033', '#ff0000aa', '#ff0000'],
  },
  {
    value: '#33ff33',
    label: 'Verde Neón',
    glow: ['#00ff0033', '#00ff00aa', '#00ff00'],
  },
  {
    value: '#3333ff',
    label: 'Azul Neón',
    glow: ['#0000ff33', '#0000ffaa', '#0000ff'],
  },
  {
    value: '#ff33ff',
    label: 'Rosa Neón',
    glow: ['#ff00ff33', '#ff00ffaa', '#ff00ff'],
  },
  {
    value: '#ffff33',
    label: 'Amarillo Neón',
    glow: ['#ffff0033', '#ffff00aa', '#ffff00'],
  },
];

const NEON_FONTS = [
  {
    value: "Imperial Script",
    label: "Imperial Script",
    url: 'https://fonts.googleapis.com/css2?family=Freehand&family=Imperial+Script&family=New+Amsterdam&display=swap'
  },
  {
    value: "League Script",
    label: "League Script",
    url: 'https://fonts.googleapis.com/css2?family=Freehand&family=Imperial+Script&family=League+Script&family=New+Amsterdam&display=swap'
  },
  {
    value: "Freehand",
    label: "Freehand",
    url: 'https://fonts.googleapis.com/css2?family=Freehand&family=Imperial+Script&family=League+Script&family=New+Amsterdam&display=swap'
  },
  {
    value: "Pattaya",
    label: "Pattaya",
    url: 'https://fonts.googleapis.com/css2?family=Freehand&family=Imperial+Script&family=League+Script&family=New+Amsterdam&family=Pattaya&display=swap'
  },
  {
    value: "Neonderthaw",
    label: "Neonderthaw",
    url: 'https://fonts.googleapis.com/css2?family=Freehand&family=Imperial+Script&family=League+Script&family=Neonderthaw&family=New+Amsterdam&family=Pattaya&display=swap'
  },
  {
    value: "Pirata One",
    label: "Pirata One",
    url: 'https://fonts.googleapis.com/css2?family=Freehand&family=Imperial+Script&family=League+Script&family=Neonderthaw&family=New+Amsterdam&family=Pattaya&family=Pirata+One&display=swap'
  },
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

const defaultBackgroundImages = [
  { src: Pared2, label: 'Fondo 2' },
  { src: Pared1, label: 'Fondo 1' },
  { src: Pared3, label: 'Fondo 3' },
  { src: Pared4, label: 'Fondo 4' },
  { src: Pared5, label: 'Fondo 5' },
  { src: Pared6, label: 'Fondo 6' },
  { src: Pared7, label: 'Fondo 7' },
];

const Canvas = () => {
  const [contentType, setContentType] = useState('text');
  const [customText, setCustomText] = useState('');
  const [selectedFont, setSelectedFont] = useState(NEON_FONTS[0].value);
  const [selectedColor, setSelectedColor] = useState(NEON_COLORS[0].value);
  const [backgroundSrc, setBackgroundSrc] = useState(defaultBackgroundImages[0].src);
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [backgroundImage] = useImage(backgroundSrc);
  const [uploadedImage] = useImage(uploadedImageSrc);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [backgroundImages, setBackgroundImages] = useState([...defaultBackgroundImages]);
  const [description, setDescription] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false)


  const imageRef = useRef(null);
  const transformerRef = useRef(null);

  const carouselSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    lazyLoad: 'ondemand',
    touchThreshold: 10,
    waitForAnimate: false,
    useCSS: true,
    useTransform: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  const [imageAttrs, setImageAttrs] = useState({
    x: CANVAS_WIDTH / 2 - 50,
    y: CANVAS_HEIGHT / 2 - 50,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    width: 100,
    height: 100,
  });

  const handleContentTypeChange = (value) => {
    setContentType(value);
    setCustomText('');
    setUploadedImageSrc(null);
    setDescription('');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && uploadedImages.length < 4) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target.result;
        setUploadedImages(prev => [...prev, newImage]);
        setUploadedImageSrc(newImage);
      };
      reader.readAsDataURL(file);
    } else if (uploadedImages.length >= 4) {
      alert('Solo se permiten hasta 4 imágenes');
    }
  };

  const handleBackgroundUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = { src: e.target.result, label: `Fondo ${backgroundImages.length + 1}` };
        setBackgroundImages(prev => [...prev, newImage]);
        setBackgroundSrc(newImage.src);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (indexToDelete) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToDelete));
    if (uploadedImageSrc === uploadedImages[indexToDelete]) {
      setUploadedImageSrc(null);
    }
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

    node.scale({ x: 1, y: 1 });
  };

  const getSelectedNeonColor = () => {
    return NEON_COLORS.find(color => color.value === selectedColor) || NEON_COLORS[0];
  };

  const renderNeonText = () => {
    if (!customText || !fontLoaded) return null;

    const neonColor = getSelectedNeonColor();
    const textConfig = {
      text: customText,
      x: CANVAS_WIDTH / 1.5,
      y: CANVAS_HEIGHT / 2,
      fontSize: 40,
      fontFamily: selectedFont,
      align: 'center',
      draggable: false,
      offsetX: customText.length * 10,
      offsetY: 20,
    };

    return (
      <>
        {/* Capa de resplandor exterior */}
        <Text
          {...textConfig}
          fill={neonColor.glow[0]}
          shadowColor={neonColor.glow[0]}
          shadowBlur={40}
          shadowOffset={{ x: 0, y: 0 }}
          opacity={0.8}
        />
        {/* Capa de resplandor medio */}
        <Text
          {...textConfig}
          fill={neonColor.glow[1]}
          shadowColor={neonColor.glow[1]}
          shadowBlur={25}
          shadowOffset={{ x: 0, y: 0 }}
          opacity={0.9}
        />
        {/* Capa de texto principal */}
        <Text
          {...textConfig}
          fill={neonColor.value}
          shadowColor={neonColor.glow[2]}
          shadowBlur={10}
          shadowOffset={{ x: 0, y: 0 }}
          opacity={1}
        />
      </>
    );
  };

  useEffect(() => {
    const loadFonts = async () => {
      const fontPromises = NEON_FONTS.map(font => {
        return new Promise((resolve, reject) => {
          const link = document.createElement('link');
          link.href = font.url;
          link.rel = 'stylesheet';
          link.onload = resolve;
          link.onerror = reject;
          document.head.appendChild(link);
        });
      });

      try {
        await Promise.all(fontPromises);
        setFontLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };

    loadFonts();
  }, []);

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
                  width: '100%',
                  padding: '0px 10px',
                }
              }}
            >
              <CarouselWrapper>
                <SliderContainer>
                  <Slider {...carouselSettings}>
                    <ThumbnailContainer>
                      <UploadButton>
                        <input type="file" onChange={handleBackgroundUpload} accept="image/*" />
                        <PlusIcon>+</PlusIcon>
                      </UploadButton>
                    </ThumbnailContainer>
                    {backgroundImages.map((bg, index) => (
                      <ThumbnailContainer key={index}>
                        <Thumbnail
                          src={bg.src}
                          alt={bg.label}
                          onClick={() => setBackgroundSrc(bg.src)}
                          selected={backgroundSrc === bg.src}
                        />
                      </ThumbnailContainer>
                    ))}
                  </Slider>
                </SliderContainer>
              </CarouselWrapper>
            </Html>

          </Layer>
          <Layer>
            {contentType === 'text' && renderNeonText()}
            {contentType === 'image' && uploadedImage && (
              <>
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
                />
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
                />
              </>
            )}
          </Layer>
        </Stage>
      </Column>
      <Column>
        <ConfigSection>
          <Label title={'SVG - TEXTO'} />
          <RadioButtons
            options={contentTypeOptions}
            name="contentType"
            onChange={handleContentTypeChange}
          />
        </ConfigSection>
        <ConfigSection>
          <Label title={'CAPAS'} />
          {contentType === 'text' ? (
            <div>
              <StyledInput
                type="text"
                placeholder="ESCRIBE UN TEXTO..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
              />
              <ConfigSection>
                <Label title={'SELECCIONAR FUENTE'} />
                <Select
                  onChange={(e) => setSelectedFont(e.target.value)}
                  value={selectedFont}
                  style={{ fontFamily: selectedFont }}
                >
                  {NEON_FONTS.map(font => (
                    <option
                      key={font.value}
                      value={font.value}
                      style={{ fontFamily: font.value }}
                    >
                      {font.label}
                    </option>
                  ))}
                </Select>
              </ConfigSection>
              <ColorSelection>
                {NEON_COLORS.map(color => (
                  <ColorButton
                    key={color.value}
                    color={color.value}
                    selected={selectedColor === color.value}
                    onClick={() => setSelectedColor(color.value)}
                  />
                ))}
              </ColorSelection>
            </div>
          ) : (
            <ImageCarousel>
              {uploadedImages.length < 4 && (
                <UploadButton>
                  <input type="file" onChange={handleImageUpload} accept="image/*" />
                  <PlusIcon>+</PlusIcon>
                </UploadButton>
              )}
              {uploadedImages.map((img, index) => (
                <ThumbnailWrapper key={index}>
                  <Thumbnail
                    src={img}
                    alt={`Uploaded ${index + 1}`}
                    onClick={() => setUploadedImageSrc(img)}
                    selected={uploadedImageSrc === img}
                  />
                  <DeleteButton onClick={() => handleDeleteImage(index)}>
                    X
                  </DeleteButton>
                </ThumbnailWrapper>
              ))}
            </ImageCarousel>
          )}
        </ConfigSection>

        {contentType === 'image' && (
          <ConfigSection>
            <Label title={'DESCRIPCIÓN'} />
            <TextArea
              placeholder="Añade una descripción..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </ConfigSection>
        )}
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

const CarouselWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderContainer = styled.div`
  width: 100%;
  padding: 10px;

  .slick-slider {
    margin: 0;
  }

  .slick-list {
    margin: 0 -5px;
  }

  .slick-slide {
    padding: 0 5px;
    
    & > div {
      display: flex;
      justify-content: center;
    }
  }

  .slick-track {
    display: flex;
    align-items: center;
    margin-left: 0;
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #E30613;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff0000;
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90px;
  padding: 5px;
  outline: none;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  border: ${props => (props.selected ? "2px solid #BC13FE" : "2px solid transparent")};
  border-radius: 5px;
  transition: border-color 0.3s;
`;

const UploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: 2px dashed #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f5f5f5;

  input {
    display: none;
  }
`;

const PlusIcon = styled.span`
  font-size: 24px;
  color: #666;
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


const StyledInput = styled.input`
  display: flex;
  text-align: center;
  border-radius: 15px;
  font-size: 11px;
  border: 2px solid transparent;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #ececec;
  width: 50%;
  height: 44px;
  outline: none;

  &:focus {
    border-color: #E30613;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 44px;
  margin-top: 10px;
  border-radius: 15px;
  border: none;
  background-color: #ececec;
  padding: 0 15px;
  outline: none;
  cursor: pointer;
  font-size: 16px;

  option {
    padding: 10px;
    font-size: 16px;
  }
`;

const ColorSelection = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ColorButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid ${props => props.selected ? '#ffffff' : 'transparent'};
  background-color: ${props => props.color};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.selected ? `0 0 15px ${props.color}` : 'none'};

  &:hover {
    box-shadow: 0 0 15px ${props => props.color};
    transform: scale(1.1);
  }
`;

const ImageCarousel = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 15px;
  border: none;
  background-color: #ececec;
  padding: 15px;
  resize: none;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: #E30613;
  }
`;
