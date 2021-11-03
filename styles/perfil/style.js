import styled from "styled-components";

export const ProfileData = styled.section`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 10rem;
  height: 10rem;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 50%;
  border: 0.2rem solid var(--blue);
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
