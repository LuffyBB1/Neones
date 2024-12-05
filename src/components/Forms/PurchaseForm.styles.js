import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  gap: 35px;
`;

export const Field = styled.div`
  flex: 1;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #666;
  font-weight: 700;
`;

export const Required = styled.span`
  color: #e30613;
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 15px;
  border: none;
  background-color: #ececec;
  padding: 0 15px;
  outline: none;
  font-size: 14px;
  color: #666;

  &:focus {
    border: 2px solid #e30613;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #e30613;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc0000;
  }
`;
