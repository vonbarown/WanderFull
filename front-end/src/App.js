import React from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './themes/theme'
import { GlobalStyles } from './themes/global'
import Landing from './Components/Landing/Landing'
import { useDarkMode } from './themes/useDarkMode'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [theme, componentMounted] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    const [trending, setTrending] = useState([])

    const fetchTrending = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/likes/posts/popular')
            setTrending(data)

        } catch (error) {
            console.log(error);
        }
    }

    console.log(trending);
    useEffect(() => {
        fetchTrending()
    }, [])

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