import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';

const Menu = ({ open }) => {
    return (
        <StyledMenu open={open}>
            <a href="/">
                <span role="img" aria-label="about us">&#x1F4AA;</span>
                Activity
            </a>
            <a href="/">
                <span role="img" aria-label="price">&#x1F49C;</span>
                Heart
            </a>
            <a href="/">
                <span role="img" aria-label="contact">&#x1F4CA;</span>
                Explore
            </a>
        </StyledMenu>
    )
};

Menu.propTypes = {
    open: bool.isRequired,
};

export default Menu;