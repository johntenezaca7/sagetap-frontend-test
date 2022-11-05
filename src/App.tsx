import React, { useEffect, useState } from 'react';
import { ArtItem, AddArtItem } from './components';
import { getAllArtwork, APIResponse, getArtwork } from './utils';
import styled from 'styled-components';

const Header = styled.h1`
  margin: 0;
  padding: 20px;
  font-size: 50px;
  box-shadow: 0px -2px 8px #929292;
`;

const ArtListContainer = styled.div`
  max-width: 1400px;
  margin: auto;
  padding: 20px;
`;

function App() {
  // TODO - Figure out correct typeing
  const [artList, setArtList] = useState<any[]>([]);
  const [appError, setAppError] = useState<Partial<APIResponse>>();

  const setAPIError = () => {
    setAppError({ error: true, message: 'An Error occurred' });
  };

  useEffect(() => {
    const idList = [{ id: 27992 }, { id: 27998 }, { id: 27999 }, { id: 27997 }, { id: 27993 }];

    try {
      getAllArtwork(idList)
        .then((artWork) => {
          setArtList(artWork);
        })
        .catch(() => {
          setAPIError();
        });
    } catch (error) {
      setAPIError();
    }
  }, []);

  const handleRemoveArt = (id: number) => {
    setArtList((prev) => [...prev.filter((listItem) => listItem.data.id !== id)]);
  };

  const handleAddArt = (id: number) => {
    try {
      getArtwork(id)
        .then((newArt) => {
          setArtList((prev) => [...prev, newArt]);
        })
        .catch(() => {
          setAPIError();
        });
    } catch (error) {
      setAPIError();
    }
  };

  return (
    <div>
      {appError?.error ? (
        <p>An Error occurred</p>
      ) : (
        <>
          <Header>Art Rater</Header>
          <ArtListContainer>
            {artList.length > 0 &&
              artList.map((art) => {
                const {
                  data: { id, image_id, title, artist_title }
                } = art;

                return (
                  <ArtItem
                    key={id}
                    id={id}
                    imageId={image_id}
                    title={title}
                    artistTitle={artist_title}
                    handleRemoveArt={handleRemoveArt}
                  />
                );
              })}
          </ArtListContainer>

          <AddArtItem onClick={handleAddArt} />
        </>
      )}
    </div>
  );
}

export { App };
