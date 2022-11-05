import { getArtwork } from './getArtWork';

export const getAllArtwork = async (idList: { id: number }[]) =>
  Promise.all(idList.map(async ({ id }) => await getArtwork(id)));
