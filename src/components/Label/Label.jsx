import React from 'react'
import styled from 'styled-components';

const Label = ({title}) => {
  return (
    <Title>{title}</Title>
  )
}

export default Label

const Title = styled.h2`
  color: #777777;
  font-weight: 500;
`;