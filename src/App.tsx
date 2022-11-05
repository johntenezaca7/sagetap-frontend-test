import React, { useEffect, useState } from 'react';
import { ArtItem, ButtonStyles, Error, Modal, AddArtItem } from './components';
import { getAllArtwork, APIResponse, getArtwork } from './utils';
import styled from 'styled-components';

const Loading = styled.div`
  margin-top: 5rem;
  text-align: center;
`;

const Header = styled.div`
  margin: 0;
  padding: 20px;
  box-shadow: 0px -2px 8px #929292;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: -webkit-fill-available;
  background-color: white;
`;

const HeaderText = styled.h1`
  margin: 0;
  font-size: 50px;
`;

const ArtListContainer = styled.div`
  max-width: 1400px;
  margin: auto;
  padding: 25px;
`;

function App() {
  // TODO - Figure out correct typeing
  const [artList, setArtList] = useState<any[]>([]);
  const [appError, setAppError] = useState<Partial<APIResponse>>();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addItemError, setAddItemError] = useState('');

  const open = () => setOpenModal(true);
  const close = () => {
    setAddItemError('');
    setOpenModal(false);
  };

  const setAPIError = () => {
    setLoading(false);
    setAppError({ error: true, message: 'An Error occurred' });
  };

  useEffect(() => {
    const idList = [{ id: 27992 }, { id: 27998 }, { id: 27999 }, { id: 27997 }, { id: 27993 }];

    try {
      getAllArtwork(idList)
        .then((artWork) => {
          setLoading(false);
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
        .then((data) => {
          if (data.status === 404) {
            setAddItemError(data.detail);
            return;
          }

          setArtList((prev) => [...prev, data]);
          setAddItemError('');
          close();
        })
        .catch((error) => {
          setAPIError();
        });
    } catch (error) {
      setAPIError();
    }
  };

  return (
    <>
      {loading ? (
        <Loading>
          <h1>Loading...</h1>
        </Loading>
      ) : appError?.error ? (
        <Error message={appError.message} />
      ) : (
        <>
          <Header>
            <HeaderText>Art Rater</HeaderText>
            <>
              <ButtonStyles onClick={open}>Add New Art</ButtonStyles>
            </>
          </Header>

          <ArtListContainer>
            {artList.length > 0 &&
              artList.map((art, i) => {
                const {
                  data: { id, image_id, title, artist_title }
                } = art;

                return (
                  <ArtItem
                    id={id}
                    key={id}
                    imageId={image_id}
                    title={title}
                    artistTitle={artist_title}
                    handleRemoveArt={handleRemoveArt}
                    listingDetails={{ index: i + 1, total: artList.length }}
                  />
                );
              })}
          </ArtListContainer>
          {openModal && (
            <Modal onClose={close}>
              <AddArtItem onClick={handleAddArt} errorMessage={addItemError} />
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export { App };
