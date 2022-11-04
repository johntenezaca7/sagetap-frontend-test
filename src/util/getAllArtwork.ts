export const getAllArtwork = async (idList: { id: number }[]) => {
  return Promise.all(
    idList.map(async ({ id }) => {
      return await fetch('https://api.artic.edu/api/v1/artworks/' + id).then((blob) => blob.json());
    })
  );
};
