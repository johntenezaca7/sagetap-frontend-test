import React, { useState } from 'react';
import { getImageUrl, submitRating, APIResponse } from '../utils';
import styled from 'styled-components';

export interface ArtItemProps {
  id: number;
  imageId: string;
  title: string;
  artistTitle: string;
  handleRemoveArt: (id: number) => void;
}

const ArtItemContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin: 4rem 0 12rem;

  .image-wrapper {
    width: 800px;

    margin-right: 5rem;

    img {
      width: 100%;
      height: auto;
    }
  }

  .details-wrapper {
    width: 550px;

    h2,
    h3 {
      margin: 0;
    }

    h2 {
      font-size: 40px;
      font-weight: 300;
    }

    h3 {
      font-weight: 250;
      font-size: 30px;
      color: rgb(112, 112, 112);
    }
  }

  .rating {
    margin-top: 2rem;
    font-size: 22px;
  }

  .cta-section {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;

    button {
      cursor: pointer;
      margin-right: 1rem;
      border: none;
      color: black;
      padding: 10px 26px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      width: 300px;
      margin-bottom: 1rem;
    }
  }
`;

const RatingButton = styled.button`
  margin-right: 1rem;
  cursor: pointer;
  border: none;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  &:hover {
    background-color: rgb(112, 112, 112);
    color: white;
  }
`;

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
    <ArtItemContainer>
      <div className="image-wrapper">
        <img alt="ArtWork" src={imageId ? getImageUrl(imageId) : ''} />
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
            </>
          )}
        </div>
      </div>
    </ArtItemContainer>
  );
};
