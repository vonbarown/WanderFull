import React from 'react'
import Landing from './Components/Landing/Landing'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './themes/theme'
import { GlobalStyles } from './themes/global'
import Toggle from './/'

const App = () => {
    return (
        <ThemeProvider theme={lightTheme}>
            <GlobalStyles />
            <Landing />
        </ThemeProvider>
    )
}

export default App