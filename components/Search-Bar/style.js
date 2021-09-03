import styled from "styled-components";

export const InputSearch = styled.div`
  grid-column: 5 / span 1;
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  grid-template-columns: 5fr 1fr;
  justify-items: center;
  align-items: center;
  border-radius: 1rem;
  transition: 0.1s ease-in-out all;

  ${(props) =>
    props.hidden &&
    `
    grid-column: 2 / span 4;
    width: 100%;
    border: 0.1rem solid var(--blue);
  `}

  @media (min-width: 750px) {
    width: 3rem;
    height: 3rem;
    ${(props) =>
      props.hidden &&
      `
        grid-column: 2 / span 4;
        width: 100%;
        border: 0.1rem solid var(--blue);
  `}
  }
  @media (min-width: 1200px) {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
    width: 100%;
    height: fit-content;
    border-radius: 1.5rem;
    border: 0.1rem solid var(--blue);
  }
`;

export const InputStyled = styled.input`
  display: none;
  width: 100%;
  padding: 0.2rem;
  padding-left: 0.5rem;
  font-size: 1.4rem;
  color: var(--text);
  background: none;
  border: none;
  outline: none;
  transition: 0.3s ease-in-out all;
  ::placeholder {
    color: var(--text);
    font-size: 1.4rem;
  }
  ${(props) =>
    props.hidden &&
    `
    display: block;
  `}
  @media (min-width: 1200px) {
    display: block;
    font-size: 2rem;
    padding: 1rem;
    ::placeholder {
      font-size: 2rem;
    }
  }
`;

export const IconContainer = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  margin: 0;

  ${(props) =>
    props.hidden &&
    `
    display: block;
    width: 1.5rem;
    height: 1.5rem;
  `}

  @media (min-width: 1200px) {
    width: 3rem;
    height: 3rem;
  }
`;