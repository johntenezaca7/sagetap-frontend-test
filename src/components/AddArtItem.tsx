import React, { useState } from 'react';
import { ButtonStyles } from './Button.styles';
import { APIResponse } from '../utils';
import styled from 'styled-components';

const Container = styled.div`
  h2 {
    margin: 0;
  }

  input {
    border: none;
    width: 200px;
    height: 40px;
    font-size: 16px;
    border-bottom: 1px solid gray;
    margin-right: 10px;
  }

  .error {
    margin-top: 2px;
    color: red;
    font-size: 14px;
  }
`;

export interface AddArtProps {
  onClick: (id: number) => void;
  errorMessage?: string;
}

export const AddArtItem = ({ onClick, errorMessage }: AddArtProps) => {
  const [artIdInput, setArtIdInput] = useState('');
  const [error, setError] = useState<Partial<APIResponse>>();

  const handleOnClick = () => {
    if (!artIdInput) {
      setError({ error: true, message: 'No id Found!' });
      return;
    }

    if (isNaN(Number(artIdInput))) {
      setError({ error: true, message: 'Not a valid id!' });
      return;
    }

    onClick(Number(artIdInput));

    setArtIdInput('');
    setError({ error: false });
  };
  return (
    <Container>
      <h2>Add Art</h2>
      <p>Type in an art id for a new peice of art!</p>
      <input value={artIdInput} onChange={(e) => setArtIdInput(e.target.value)} placeholder="Enter a number" />

      <ButtonStyles onClick={handleOnClick}>Add</ButtonStyles>

      {error ? <p className="error">{error?.message ?? errorMessage}</p> : null}
    </Container>
  );
};
