import Pared1 from '../assets/images/fondo1.jpeg';
import Pared2 from '../assets/images/fondo2.jpeg';
import Pared3 from '../assets/images/fondo3.jpeg';
import Pared4 from '../assets/images/fondo4.jpeg';
import Pared5 from '../assets/images/fondo5.jpeg'
import Pared6 from '../assets/images/fondo6.jpeg';
import Pared7 from '../assets/images/fondo7.jpeg';

export const contentTypeOptions = [
    { value: "text", label: "ESCRIBE TU NEÓN" },
    { value: "image", label: "SUBIR TU SVG PERSONALIZADO" },
  ];

export const NEON_COLORS = [
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
    {
      value: '#33ffff',
      label: 'Cian Neón',
      glow: ['#00ffff33', '#00ffffaa', '#00ffff'],
    },
    {
      value: '#ff9933',
      label: 'Naranja Neón',
      glow: ['#ff990033', '#ff9900aa', '#ff9900'],
    },
    {
      value: '#ff66cc',
      label: 'Magenta Neón',
      glow: ['#ff66cc33', '#ff66ccaa', '#ff66cc'],
    },
    {
      value: '#66ff66',
      label: 'Lima Neón',
      glow: ['#66ff6633', '#66ff66aa', '#66ff66'],
    },
    {
        value: '#ffffff',
        label: 'Blanco Neón',
        glow: ['#ffffff33', '#ffffffaa', '#ffffff'],
      },
    {
        value: '#f5deb3',
        label: 'Beige Neón',
        glow: ['#f5deb333', '#f5deb3aa', '#f5deb3'],
      },
  ];
  
  
 export const NEON_FONTS = [
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
  
  
export const cutOptions = [
    { value: "option1", label: "RECTANGULAR" },
    { value: "option2", label: "RECTANGULAR CON BORDES" },
    { value: "option3", label: "CIRCULAR" },
    { value: "option4", label: "SILUETA" }
  ];
  
export  const suportOptions = [
    { value: "option1", label: "SIN SOPORTE" },
    { value: "option2", label: "CON TORNILLOS" },
    { value: "option3", label: "COLGADO" },
    { value: "option4", label: "CON PATAS" }
  ];
  
export  const useOptions = [
    { value: "option1", label: "INTERIOR" },
    { value: "option2", label: "EXTERIOR (PROTECCIÓN)" }
  ];
  
export  const defaultBackgroundImages = [
    { src: Pared2, label: 'Fondo 2' },
    { src: Pared1, label: 'Fondo 1' },
    { src: Pared3, label: 'Fondo 3' },
    { src: Pared4, label: 'Fondo 4' },
    { src: Pared5, label: 'Fondo 5' },
    { src: Pared6, label: 'Fondo 6' },
    { src: Pared7, label: 'Fondo 7' },
  ];
  
export  const FONT_SIZES = [20, 24, 26, 30, 36, 40, 46, 50, 60, 70, 74, 80, 86, 90, 100, 104];
