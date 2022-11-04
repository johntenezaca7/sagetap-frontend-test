import React, { useState } from 'react';
import { getImageUrl, submitRating, APIResponse } from '../util';

export interface ArtItemProps {
  id: number;
  imageId: string;
  title: string;
  artistTitle: string;
  handleRemoveArt: (id: number) => void;
}

const Ratings = [1, 2, 3, 4, 5];

export const ArtItem = ({ id, imageId, title, artistTitle, handleRemoveArt }: ArtItemProps) => {
  const [rating, setRaiting] = useState<null | number>(null);
  const [successMessage, setSuccessMessage] = useState<Partial<APIResponse>>({
    message: ''
  });

  const onSubmit = async () => {
    if (rating) {
      try {
        submitRating({ id, rating })
          // TODO - Figure out correct typing for 'response'
          .then((response: any) => {
            setSuccessMessage({ error: false, message: response.message, success: true });
          })
          .catch(() => {
            setSuccessMessage({ error: true, message: 'An Error occurred' });
          });
      } catch (error) {
        setSuccessMessage({ error: true, message: 'An Error occurred' });
      }
    }
  };

  const handleSetRating = (ratingValue: number) => {
    setRaiting(ratingValue);
  };

  return (
    <div className="item">
      <h2>{title && title}</h2>
      <h3>{artistTitle && artistTitle}</h3>

      <img alt="ArtWork" src={imageId ? getImageUrl(imageId) : ''} />
      <p data-testid="rating">Rating: {rating ? String(rating) : '-'}</p>

      {successMessage.error && <p>An Error occurred</p>}

      {successMessage.success && !successMessage.error ? (
        <p data-testid="api-message">{successMessage.message}</p>
      ) : (
        <>
          {Ratings.map((rating) => {
            return (
              <button
                data-testid={`rating-button-${rating}`}
                key={rating}
                onClick={() => {
                  handleSetRating(rating);
                }}
              >
                {String(rating)}
              </button>
            );
          })}

          <button data-testid="submit-button" disabled={rating === null} onClick={onSubmit}>
            Submit
          </button>
        </>
      )}
      <button onClick={() => handleRemoveArt(id)}>Remove Art</button>
    </div>
  );
};
