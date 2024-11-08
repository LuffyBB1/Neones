import React, { useState, useRef } from 'react';
import { Stage, Layer, Text, Line } from 'react-konva';
import styled from 'styled-components';
import Canvas from './components/Canvas/Canvas';


export default function CanvasEditor() {

  return (
    <Container>
      <h1>Crea el tuyo ahora!</h1>
      <Canvas/>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
`;