export interface SubmitRatingProps {
  id: number;
  rating: number;
}
export const submitRating = ({ id, rating }: SubmitRatingProps) => {
  return fetch('https://v0867.mocklab.io/rating', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, rating })
  }).then((response) => response.json());
};
