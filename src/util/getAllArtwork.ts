import { getArtwork } from './getArtWork';

export const getAllArtwork = async (idList: { id: number }[]) => {
  return Promise.all(
    idList.map(async ({ id }) => {
      return await getArtwork(id);
    })
  );
};
