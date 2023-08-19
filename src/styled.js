import styled from 'styled-components';

export const ReloadContainer = styled.div`
  margin: 40px;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 999;
`;


export const ScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export const Title = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: linear-gradient(0deg, #222D2F 0%, #20394d 25%, #1ea7fd 100%);
  text-transform: uppercase;
  font-size: 5em;
`

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  height: 80vh;
  padding: 30px 0;
  width: 100vw;
`;

export const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const InstagramUserTypeButton = styled.button`
  background: #1ea7fd;
  color: white;
  height: 60px;
  width: 15vw;
  min-width: 250px;
  margin: 1em 2em;
  outline: none;
  border-radius: 15px;
  border: ${({selected}) => selected ? '1px solid white' : 'none'};
  cursor: pointer;
  transition: 0.2s;
  font-family: Tahoma, serif;
  text-transform: uppercase;
  font-size: 1em;

  &:hover {
    background: #3db5ff;
  }
`;

export const SectionWrapper = styled.div`
  overflow-y: scroll;
`
