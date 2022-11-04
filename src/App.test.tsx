import { render, screen, fireEvent } from '@testing-library/react';

import { App } from './App';
import { ArtItem, ArtItemProps } from './components';
import { submitRating, getAllArtwork } from './util';

const mocks = {
  title: 'Art Rater',
  artWork: { title: 'Sample', id: '1', imageId: 'sample', artistTitle: 'Sample title' },
  submitRating: submitRating as jest.Mock,
  getAllArtwork: getAllArtwork as jest.Mock
};

const getSubmitButton = () => screen.getByTestId('submit-button');
const getRatingText = () => screen.getByTestId('rating');
const getRatingButton = (rating: string) => screen.getByTestId(`rating-button-${rating}`);

const renderApp = () => render(<App />);
const renderArtItem = (props: ArtItemProps) => render(<ArtItem {...props} />);

jest.mock('./util/submitRating', () => ({
  submitRating: jest.fn()
}));

describe('Art Rater', () => {
  test('has title', () => {
    renderApp();

    expect(screen.getByText(mocks.title)).toBeInTheDocument();
  });

  test('for an art item, submit button is disabled until a rating is selected', () => {
    renderArtItem({ ...mocks.artWork });

    expect(getSubmitButton()).toBeDisabled();

    fireEvent.click(getRatingButton('1'));

    expect(getSubmitButton()).toBeEnabled();
  });

  test('for an art item, clicking numbered button updates rating display below image to be that number', () => {
    renderArtItem({ ...mocks.artWork });

    expect(getRatingText()).toHaveTextContent('-');

    fireEvent.click(getRatingButton('3'));

    expect(getRatingText()).toHaveTextContent('3');
  });

  test('for an art item, clicking numbered button updates rating display below image to be that number, clicking two different numbers one after the other', () => {
    renderArtItem({ ...mocks.artWork });

    expect(getRatingText()).toHaveTextContent('-');

    fireEvent.click(getRatingButton('3'));

    expect(getRatingText()).toHaveTextContent('3');

    fireEvent.click(getRatingButton('2'));

    expect(getRatingText()).toHaveTextContent('2');

    fireEvent.click(getRatingButton('5'));

    expect(getRatingText()).toHaveTextContent('5');
  });

  test('for an art item, clicking submit POSTs update, displays a toast success message, hides buttons', () => {
    // The endpoint and payload for the submit button can be found in the submit method in `App.tsx`.
    // For the purpose of this test, please use a mock function instead.
    renderArtItem({ ...mocks.artWork });

    expect(getSubmitButton()).toBeDisabled();

    fireEvent.click(getRatingButton('1'));

    expect(getSubmitButton()).toBeEnabled();

    fireEvent.click(getSubmitButton());

    expect(mocks.submitRating).toHaveBeenCalledTimes(1);
    expect(mocks.submitRating).toHaveBeenLastCalledWith({ id: '1', rating: 1 });
  });
});
