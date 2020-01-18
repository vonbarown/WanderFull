import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../themes/theme'
import { GlobalStyles } from '../themes/global'
import Toggle from '../themes/Toggler'
import { useDarkMode } from '../themes/useDarkMode'
import axios from 'axios'
import '../styles/settings.css'


const Settings = () => {

    const [theme, toggleTheme, componentMounted] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    const [data, setData] = useState({ hits: [] })
    const [username, setUsername] = useState('');



    useEffect(() => {
        const fetchData = async () => {
            const { data: { payload } } = await axios.patch(`http://localhost:8080/users/update/${sessionStorage.getItem('user_id')}`,
                {
                    username: username
                }

            );
            sessionStorage.setItem('user', payload.username)
            setData(payload);
        }

        fetchData()
    }, [username])


    console.log(username);


    if (!componentMounted) {
        return <div />
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
                <form onSubmit={e => e.preventDefault()} >
                    <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)}></input>
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
