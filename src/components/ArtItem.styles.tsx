import styled from 'styled-components';

export const ArtItemContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin: 12rem 0 12rem;

  .image-wrapper {
    width: 800px;

    margin-right: 4rem;

    img {
      width: 100%;
      height: auto;
    }
  }

  .details-wrapper {
    width: 550px;

    h2,
    h3 {
      margin: 0;
    }

    h2 {
      font-size: 40px;
      font-weight: 300;
    }

    h3 {
      font-weight: 250;
      font-size: 30px;
      color: rgb(112, 112, 112);
    }
  }

  .rating {
    margin-top: 2rem;
    font-size: 22px;
  }

  .cta-section {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;

    button {
      cursor: pointer;
      margin-right: 1rem;
      border: none;
      color: black;
      padding: 10px 26px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      width: 300px;
      margin-bottom: 1rem;
    }
  }
  .listing {
    text-align: end;
  }
`;

export const RatingButton = styled.button`
  margin-right: 1rem;
  cursor: pointer;
  border: none;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  &:hover {
    background-color: rgb(112, 112, 112);
    color: white;
  }
`;
