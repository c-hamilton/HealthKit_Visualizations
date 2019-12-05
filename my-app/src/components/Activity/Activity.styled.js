// Activity.styled.js
import styled from 'styled-components';

export const StyledActivity = styled.div`
    background: ${({open}) => open ? 'pink' : 'blue'};
`;

// transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(+20%)'};