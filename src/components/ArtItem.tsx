import React, { useState } from 'react';
import { getImageUrl, submitRating, APIResponse } from '../utils';
import { ArtItemContainer, RatingButton } from './ArtItem.styles';

export interface ArtItemProps {
  id: number;
  imageId: string;
  title: string;
  artistTitle: string;
  handleRemoveArt: (id: number) => void;
  listingDetails: { index: number; total: number };
}

const Ratings = [1, 2, 3, 4, 5];

export const ArtItem = ({ id, imageId, title, artistTitle, handleRemoveArt, listingDetails }: ArtItemProps) => {
  const [rating, setRaiting] = useState<null | number>(null);
  const [successMessage, setSuccessMessage] = useState<Partial<APIResponse>>({
    message: ''
  });

  const onSubmit = async () => {
    if (rating === null) return;

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
  };

  const handleSetRating = (ratingValue: number) => {
    setRaiting(ratingValue);
  };

  return (
    <ArtItemContainer>
      <div className="image-wrapper">
        <img alt="ArtWork" src={getImageUrl(imageId)} />
      </div>

      <div>
        <div className="details-wrapper">
          <h2>{artistTitle && artistTitle}</h2>
          <h3>{title && title}</h3>
        </div>

        <div>
          <p className="rating" data-testid="rating">
            Rating: {rating ? String(rating) : '-'}
          </p>

          {successMessage.error && <p>An Error occurred</p>}

          {successMessage.success && !successMessage.error ? (
            <p data-testid="api-message">{successMessage.message}</p>
          ) : (
            <>
              {Ratings.map((rating) => {
                return (
                  <RatingButton
                    data-testid={`rating-button-${rating}`}
                    key={rating}
                    onClick={() => {
                      handleSetRating(rating);
                    }}
                  >
                    {String(rating)}
                  </RatingButton>
                );
              })}

              <div className="cta-section">
                <div className="submit-button">
                  <button
                    data-testid="submit-button"
                    disabled={rating === null}
                    onClick={onSubmit}
                    style={{ cursor: rating === null ? 'not-allowed' : 'pointer' }}
                  >
                    Submit
                  </button>
                </div>

                <div>
                  <button onClick={() => handleRemoveArt(id)}>Remove Art</button>
                </div>
              </div>
              <p className="listing">{`${listingDetails.index} of ${listingDetails.total}`}</p>
            </>
          )}
        </div>
      </div>
    </ArtItemContainer>
  );
};
