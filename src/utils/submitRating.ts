export interface SubmitRatingProps {
  id: number;
  rating: number;
}
export const submitRating = ({ id, rating }: SubmitRatingProps) =>
  fetch('https://v0867.mocklab.io/rating', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, rating })
  }).then((blob) => blob.json());
