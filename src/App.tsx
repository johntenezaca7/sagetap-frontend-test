/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { ArtItem } from './components';
import { getAllArtwork, APIResponse } from './util';
import './App.css';

function App() {
  // TODO - Figure out correct typeing
  const [artList, setArtList] = useState<any[]>();
  const [appError, setAppError] = useState<APIResponse>();

  useEffect(() => {
    const idList = [{ id: 27992 }, { id: 27998 }, { id: 27999 }, { id: 27997 }, { id: 27993 }];

    try {
      getAllArtwork(idList)
        .then((artWork) => {
          setArtList(artWork);
        })
        .catch(() => {
          setAppError({ error: true, message: 'An Error occurred' });
        });
    } catch (error) {
      setAppError({ error: true, message: 'An Error occurred' });
    }
  }, []);

  return (
    <div className="App">
      <h1>Art Rater</h1>
      {!appError?.error &&
        artList &&
        artList.length > 0 &&
        artList.map((art) => {
          const {
            data: { id, image_id, title, artist_title }
          } = art;

          return <ArtItem key={id} id={id} imageId={image_id} title={title} artistTitle={artist_title} />;
        })}

      {appError?.error && <p>An Error occurred</p>}
    </div>
  );
}

export { App };
