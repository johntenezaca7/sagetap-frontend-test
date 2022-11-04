export const getArtwork = async (id: number) => {
  return await fetch('https://api.artic.edu/api/v1/artworks/' + id).then((blob) => blob.json());
};
