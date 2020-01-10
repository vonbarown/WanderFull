import React from 'react'
import Landing from './Components/Landing/Landing'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './Components/themes/theme'
import { GlobalStyles } from './Components/themes/global'

const App = () => {
    return (
        <ThemeProvider theme={lightTheme}>
            <GlobalStyles />
            <Landing />
        </ThemeProvider>
    )
}

export default App