import React, { useState } from 'react';
import { APIResponse } from '../util';

export interface AddArtProps {
  onClick: (id: number) => void;
}
export const AddArtItem = ({ onClick }: AddArtProps) => {
  const [artIdInput, setArtIdInput] = useState('');
  const [error, setError] = useState<Partial<APIResponse>>();

  const handleOnClick = () => {
    if (!artIdInput) {
      setError({ error: true, message: 'No id Found!' });
      return;
    }

    if (isNaN(Number(artIdInput))) {
      setError({ error: true, message: 'Not a valid id' });
      return;
    }

    onClick(Number(artIdInput));

    setArtIdInput('');
    setError({ error: false });
  };
  return (
    <div>
      <input
        value={artIdInput}
        onChange={(e) => setArtIdInput(e.target.value)}
        placeholder="Type in an art id for a new peice of art!"
      />

      <button onClick={handleOnClick}>Add</button>
      {error && <p>{error.message}</p>}
    </div>
  );
};
