import React from 'react'
import { func, string } from 'prop-types';
import ToggleContainer from './ToggleStyle'

import { ReactComponent as MoonIcon } from './icons/moon.svg';
import { ReactComponent as SunIcon } from './icons/sun.svg';

const Toggle = ({ theme, toggleTheme }) => {
    const isLight = theme === 'light';
    return (
        <ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
            <SunIcon />
            <MoonIcon />
        </ToggleContainer>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;