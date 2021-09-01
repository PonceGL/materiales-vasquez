import styled from "styled-components";

export const ListFavorites = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Title = styled.p`
  grid-column: 1 / span 3;
  width: 100%;
  margin: 1rem auto;
  font-size: 1.6rem;
  text-align: center;
  font-weight: 500;
`;

export const FavoritesContainer = styled.div`
  width: 100%;
  min-height: 50vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  grid-auto-rows: 27rem;
  grid-gap: 1rem;
  align-items: stretch;

  @media (min-width: 750px) {
    grid-template-columns: repeat(auto-fill, 32%);
    grid-auto-rows: 30rem;
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 35rem;
  }

  /* width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: min-content;
  grid-gap: 1rem;
  @media (min-width: 750px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem 1rem;
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 3rem 1rem;
  } */
`;
