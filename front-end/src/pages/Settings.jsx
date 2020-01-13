import React from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../themes/theme'
import { GlobalStyles } from '../themes/global'
import Toggle from '../themes/Toggler'
import { useDarkMode } from '../themes/useDarkMode'
import '../styles/settings.css'


const Settings = () => {

    const [theme, toggleTheme, componentMounted] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    if (!componentMounted) {
        return <div />
    }
    const handleSubmit = (event) => {
        // make patch network request to /users endpoint
        // event.preventDefault()
        console.log('form was submitted')
    }

    // render() {
    return (
        <div className='settingsPage'>
            <ThemeProvider theme={themeMode} >
                <GlobalStyles />
                <h1>Settings</h1>
                <div className='toggleButton'>
                    <p>Dark Theme</p>
                    <Toggle theme={theme} toggleTheme={toggleTheme} />
                </div>
                <p>Edit Profile info</p>
                <form onSubmit={handleSubmit()}>
                    <input type="text" placeholder="username"></input>
                    <input type="text" placeholder="profile pic url"></input>
                    <button>Submit</button>
                </form>
            </ThemeProvider >
            <div>Moon Icon made by<a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                {' '} Sun Icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
            </div>
        </div>
    )
    // }
}

export default Settings 
