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
`;

export const Title = styled.div`
  height: 10vh;
  padding: 30px 30px 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, #222D2F 0%, #20394d 25%, #1ea7fd 100%);
  text-transform: uppercase;
  font-size: 3em;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  flex-wrap: wrap;
`;

export const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const InstagramUserTypeButton = styled.button`
  background: #1ea7fd;
  color: white;
  height: 40px;
  max-width: 10vw;
  min-width: 200px;
  margin: 1em 2em;
  outline: none;
  border-radius: 15px;
  border: ${({selected}) => selected ? '1px solid white' : 'none'};
  cursor: pointer;
  transition: 0.2s;
  font-family: Tahoma, serif;
  text-transform: uppercase;
  font-size: 0.8em;

  &:hover {
    background: #3db5ff;
  }
`;

export const SectionWrapper = styled.div`
  overflow-y: scroll;
`
