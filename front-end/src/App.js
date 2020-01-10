import React from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './themes/theme'
import { GlobalStyles } from './themes/global'
import Toggle from './themes/Toggler'
import Landing from './Components/Landing/Landing'
import { useDarkMode } from './themes/useDarkMode'

const App = () => {
    const [theme, toggleTheme, componentMounted] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    if (!componentMounted) {
        return <div />
    }

    return (
        <ThemeProvider theme={themeMode} >
            <GlobalStyles />
            <Landing />
        </ThemeProvider >
    )
}

export default App