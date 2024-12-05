import styled from "styled-components";

// Estilos con styled-components
export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  height: 90vh;
`;

export const Column = styled.div`
  flex: 1;
  padding: 20px;
  height: auto;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;

export const ConfigSection = styled.div`
  margin-bottom: 20px;
`;

export const Groups = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

export const CarouselWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SliderContainer = styled.div`
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

export const ThumbnailWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #e30613;
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

export const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90px;
  padding: 5px;
  outline: none;
`;

export const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  border: ${(props) =>
    props.selected ? "2px solid #BC13FE" : "2px solid transparent"};
  border-radius: 5px;
  transition: border-color 0.3s;
`;

export const UploadButton = styled.label`
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

export const PlusIcon = styled.span`
  font-size: 24px;
  color: #666;
`;

export const Button = styled.button`
  background-color: #e30613;
  width: 100%;
  height: 50px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const ButtonEliminarTexto = styled.button`
  background-color: #e30613;
  width: 50%;
  height: 44px;
  margin-top: 10px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

export const StyledInput = styled.input`
  display: flex;
  margin-top: 10px;
  text-align: center;
  border-radius: 15px;
  font-size: 13px;
  color: #666666;
  border: 2px solid transparent;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #ececec;
  width: 50%;
  height: 44px;
  outline: none;
  &:focus {
    border-color: #e30613;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 15px;
  border: none;
  background-color: #ececec;
  padding: 15px;
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: 20px;

  &:focus {
    border-color: #e30613;
  }
`;

export const SelectFont = styled.select`
  width: 100%;
  height: 44px;
  margin-top: 10px;
  border-radius: 15px;
  border: none;
  background-color: #ececec;
  padding: 0 15px;
  outline: none;
  cursor: pointer;
  font-size: 21px;

  option {
    padding: 10px;
    font-size: 16px;
  }
`;

export const SelectNumber = styled.select`
  width: 100%;
  height: 44px;
  margin-top: 10px;
  border-radius: 15px;
  border: none;
  background-color: #ececec;
  padding: 0 15px;
  outline: none;
  cursor: pointer;
  font-size: 17px;
  color: #666666;

  option {
    padding: 10px;
    font-size: 16px;
  }
`;

export const ColorSelection = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  marginbottom: 20px;
`;

export const ColorButton = styled.button`
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 50%;
  border: ${(props) =>
    props.color === "#ffffff" // Si el color es blanco
      ? props.selected
        ? "3px solid #000000" // Borde negro más grueso cuando está seleccionado
        : "1px solid #000000" // Borde negro más delgado cuando no está seleccionado
      : props.selected
      ? "3px solid #ffffff" // Borde blanco para otros colores seleccionados
      : "3px solid transparent"}; // Sin borde para otros colores no seleccionados
  background-color: ${(props) => props.color};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${(props) =>
    props.selected
      ? props.color === "#ffffff" // Si el color es blanco
        ? `0 0 15px #000000` // Sombra negra
        : `0 0 15px ${props.color}` // Sombra del color seleccionado
      : "none"};

  &:hover {
    box-shadow: ${(props) =>
      props.color === "#ffffff" // Si el color es blanco
        ? `0 0 15px #000000` // Sombra negra
        : `0 0 15px ${props.color}`}; // Sombra del color al pasar el mouse
    transform: scale(1.1);
  }
`;

export const ImageCarousel = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
`;
