import styled from 'styled-components';

export const Checkbox = styled.img`
  background: ${({checked}) => checked ? '#3eb500' : 'none'};
  border-radius: 50%;
  transition: 10s;
`;
