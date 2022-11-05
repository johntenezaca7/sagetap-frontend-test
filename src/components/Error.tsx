import React from 'react';
import styled from 'styled-components';
import { APIResponse } from '../utils';

const Container = styled.div`
  max-width: 500px;
  margin: auto;
  text-align: center;
`;

export const Error = ({ message }: Partial<APIResponse>) => {
  return (
    <Container>
      <h1>Error</h1>
      <p>{`${message} Try reloading the page.` ?? 'An Error occurred'}</p>
    </Container>
  );
};
