import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;

  .content {
    position: relative;
    background-color: white;
    margin: auto;
    height: 150px;
    width: 600px;
    padding: 20px;
    box-shadow: 0px 0px 8px #929292;

    .close {
      cursor: pointer;
      font-weight: bold;
      position: absolute;
      right: 2rem;
    }
  }
`;

interface ModalProps extends PropsWithChildren {
  onClose: () => void;
}

export const Modal = (props: ModalProps) => {
  return (
    <Container>
      <div className="content">
        <div className="close" onClick={props.onClose}>
          X
        </div>
        {props.children}
      </div>
    </Container>
  );
};
