import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Text, Image as KonvaImage, Transformer, Rect, Group } from 'react-konva';
import { Html } from 'react-konva-utils';
import {  Container,  Column,  ConfigSection,  Groups,  CarouselWrapper,  SliderContainer,  ThumbnailWrapper,  DeleteButton,  ThumbnailContainer,  Thumbnail,
  UploadButton,  PlusIcon,  Button,  StyledInput,  ColorSelection,  ColorButton,  ImageCarousel,  TextArea,
  SelectFont,  SelectNumber, ButtonEliminarTexto} from './Canvas.styles.js';
import useImage from 'use-image';
import Label from '../Label/Label';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RadioButtons from '../Buttons/RadioButtons';
import { contentTypeOptions, NEON_COLORS, NEON_FONTS, cutOptions, suportOptions, useOptions, defaultBackgroundImages, FONT_SIZES } from '../../constants/options';


const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 800;

const Canvas = () => {
  const [contentType, setContentType] = useState('text');
  const [texts, setTexts] = useState([
    {
      id: Date.now(), // ID único para el texto inicial
      text: 'ESCRIBE TU NEÓN',
      x: CANVAS_WIDTH / 2 - 250,
      y: CANVAS_HEIGHT / 2 - 50,
      fontFamily: NEON_FONTS[5].value,
      color: NEON_COLORS[2].value,
      fontSize: 60,
      offsetX: 0, // Se calculará dinámicamente más adelante
      offsetY: 0, // Se calculará dinámicamente más adelante
    },
  ]); // Reemplaza customText
  const [selectedTextId, setSelectedTextId] = useState(texts[0]?.id || null);
  const [backgroundSrc, setBackgroundSrc] = useState(defaultBackgroundImages[0].src);
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [backgroundImage] = useImage(backgroundSrc);
  const [uploadedImage] = useImage(uploadedImageSrc);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [backgroundImages, setBackgroundImages] = useState([...defaultBackgroundImages]);
  const [description, setDescription] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);
  const textRefs = useRef({});
  const transformerRef = useRef(null);
  const imageRef = useRef(null);


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

  const calculateCoverImage = (canvasWidth, canvasHeight, imageWidth, imageHeight) => {
    const canvasRatio = canvasWidth / canvasHeight;
    const imageRatio = imageWidth / imageHeight;
  
    let width, height;
  
    if (canvasRatio > imageRatio) {
      // Canvas es más ancho que la imagen
      width = canvasWidth;
      height = canvasWidth / imageRatio;
    } else {
      // Canvas es más alto que la imagen
      width = canvasHeight * imageRatio;
      height = canvasHeight;
    }
  
    return {
      width,
      height,
      offsetX: width / 2,
      offsetY: height / 2,
    };
  };

  const renderBackground = () => {
    if (!backgroundImage) return null;
  
    const { width, height, offsetX, offsetY } = calculateCoverImage(
      CANVAS_WIDTH,
      CANVAS_HEIGHT,
      backgroundImage.width,
      backgroundImage.height
    );
  
    return (
      <KonvaImage
        image={backgroundImage}
        width={width}
        height={height}
        x={CANVAS_WIDTH / 2}
        y={CANVAS_HEIGHT / 2}
        offsetX={offsetX}
        offsetY={offsetY}
      />
    );
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
    // setTexts([]);
    setUploadedImageSrc(null);
    //setDescription('');
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

  // Función para agregar un nuevo texto
  const addText = () => {
    const newText = {
      id: Date.now(),
      text: 'Ingrese aquí su texto',
      x: CANVAS_WIDTH / 2 - 250,
      y: CANVAS_HEIGHT / 2 - 50,
      fontFamily: NEON_FONTS[0].value,
      color: NEON_COLORS[0].value,
      fontSize: 40,
      offsetX: 0, 
      offsetY: 0, 
    };
    setTexts(prev => [...prev, newText]);
    setSelectedTextId(newText.id);
  };

  // Función para manejar la selección del texto
  const handleTextClick = (id) => {
    setSelectedTextId(id);
  };

  // Funciones para manejar los cambios en el texto seleccionado
  const handleTextChange = (id, newText) => {
    setTexts(prev =>
      prev.map(text =>
        text.id === id ? { ...text, text: newText } : text
      )
    );
  };



  const handleFontChange = (id, newFont) => {
    setTexts(prev =>
      prev.map(text =>
        text.id === id ? { ...text, fontFamily: newFont } : text
      )
    );
  };

  const handleColorChange = (id, newColor) => {
    setTexts(prev =>
      prev.map(text =>
        text.id === id ? { ...text, color: newColor } : text
      )
    );
  };

  const handleFontSizeChange = (id, newSize) => {
    setTexts((prev) =>
      prev.map((text) =>
        text.id === id ? { ...text, fontSize: newSize } : text
      )
    );
  };

  const handleDeleteText = (id) => {
    setTexts((prev) => prev.filter((text) => text.id !== id));
    setSelectedTextId(null); // Deselecciona el texto eliminado
  };

  const renderNeonTexts = () => {
    if (!fontLoaded) return null;

    return texts.map((textObj) => {
      const neonColor = NEON_COLORS.find(color => color.value === textObj.color) || NEON_COLORS[0];

      // Crear una referencia para este texto si no existe
      if (!textRefs.current[textObj.id]) {
        textRefs.current[textObj.id] = React.createRef();
      }

      const groupRef = textRefs.current[textObj.id];
      const textConfig = {
        text: textObj.text,
        x: textObj.x,
        y: textObj.y,
        fontSize: textObj.fontSize,
        fontFamily: textObj.fontFamily,
        align: 'center',
        draggable: true,
        wrap: 'word',
        width: CANVAS_WIDTH - 40, // Ajusta el ancho disponible
      };

      const handleDragMoveText = (e) => {
        const { x, y } = e.target.position();
        setTexts(prev =>
          prev.map(text =>
            text.id === textObj.id ? { ...text, x, y } : text
          )
        );
      };

      return (
        <Group
          key={textObj.id}
          ref={groupRef}
          onDragMove={handleDragMoveText}
          onClick={() => handleTextClick(textObj.id)}
          draggable
        >
          {/* Rectángulo como borde */}
        
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

          {/* Ícono de basura (aparece solo si el texto está seleccionado) */}
          {selectedTextId === textObj.id && (
            <Text
              text="🗑️" // Usa un emoji o un ícono SVG si prefieres
              x={textObj.x + 50} // Ajusta la posición al lado del texto
              y={textObj.y - 20}
              fontSize={20}
              onClick={(e) => {
                e.cancelBubble = true; // Evita que el clic deseleccione el texto
                handleDeleteText(textObj.id);
              }}
              fill="red"
              cursor="pointer"
            />
          
            
          )}
        </Group>
      );
    });
  };

  // useEffect para actualizar el Transformer cuando cambia el texto seleccionado
  useEffect(() => {
    if (selectedTextId && transformerRef.current) {
      const selectedNode = textRefs.current[selectedTextId];
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedTextId, texts]);

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
          {renderBackground()}
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
          <Rect
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              fill="transparent" // Mantén el fondo transparente
              onClick={() => setSelectedTextId(null)} // Deseleccionar texto al hacer clic
            />
            {contentType === 'text' && renderNeonTexts()}
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
        {contentType === 'text' && (
          <ConfigSection>
            {/* Mostrar los inputs para el texto seleccionado */}
            {selectedTextId && (
              <div>
                <Label title={'ESCRIBE TU TEXTO'} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <StyledInput
                  type="text"
                  //placeholder="Escribe tu texto..."
                  value={texts.find(text => text.id === selectedTextId)?.text || ''}
                  onChange={(e) => handleTextChange(selectedTextId, e.target.value)}
                  style={{ // Permite que el input ocupe el espacio restante
                    height: '44px', // Asegura que la altura coincida con el botón
                  }}

                />
                <ButtonEliminarTexto onClick={() => handleDeleteText(selectedTextId)}>
                  Eliminar Texto
                </ButtonEliminarTexto>
                </div>
                <ConfigSection>
                  <Label title={'SELECCIONAR FUENTE'} />
                  <SelectFont
                    onChange={(e) => handleFontChange(selectedTextId, e.target.value)}
                    value={texts.find(text => text.id === selectedTextId)?.fontFamily || NEON_FONTS[0].value}
                    style={{ fontFamily: texts.find(text => text.id === selectedTextId)?.fontFamily }}
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
                  </SelectFont>
                </ConfigSection>
                <ConfigSection>
                  <Label title={'TAMAÑO DE FUENTE'} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Campo de entrada manual */}
                    <StyledInput
                      type="number"
                      min="8"
                      max="100"
                      step="1"
                      value={texts.find(text => text.id === selectedTextId)?.fontSize || 40}
                      onChange={(e) => handleFontSizeChange(selectedTextId, parseInt(e.target.value, 10))}
                      style={{ width: '60px' }}
                    />

                    {/* Selector de valores comunes */}
                    <SelectNumber
                      value={texts.find(text => text.id === selectedTextId)?.fontSize || ''}
                      onChange={(e) => handleFontSizeChange(selectedTextId, parseInt(e.target.value, 10))}
                    >
                      <option value="">Seleccionar</option>
                      {FONT_SIZES.map(size => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </SelectNumber>
                  </div>
                </ConfigSection>
                <ColorSelection>
                  {NEON_COLORS.map(color => (
                    <ColorButton
                      key={color.value}
                      color={color.value}
                      selected={texts.find(text => text.id === selectedTextId)?.color === color.value}
                      onClick={() => handleColorChange(selectedTextId, color.value)}
                    />
                  ))}
                </ColorSelection>
              </div>
            )}
            <Button onClick={addText}>Agregar Nuevo Texto</Button>
          </ConfigSection>
        )}
        
        {contentType === 'image' && (
          <ConfigSection>
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
            <ConfigSection>
              <Label title={'DESCRIPCIÓN'} />
              <TextArea
                placeholder="Añade una descripción..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </ConfigSection>
          </ConfigSection>
        )}
        {/* Resto de las configuraciones */}
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

