import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../themes/theme'
import { GlobalStyles } from '../themes/global'
import Toggle from '../themes/Toggler'
import { useDarkMode } from '../themes/useDarkMode'
import '../styles/settings.css'
import { Button } from '@material-ui/core'
import axios from 'axios'


const useStyles = {
    display: 'none',
}

const Settings = () => {

    const [theme, toggleTheme, componentMounted] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    const [data, setData] = useState({ data: [] })
    const [username, setUsername] = useState('');


    const fetchData = async () => {
        const { data: { payload } } = await axios.patch(`http://localhost:8080/users/update/${sessionStorage.getItem('user_id')}`,
            {
                username: username
            }

        );
        sessionStorage.setItem('user', payload.username)
        setData(payload);
    }

    if (!componentMounted) {
        return <div />
    }

    const handleProfilePicUpdate = async (event) => {
        event.preventDefault()
        console.log('updating profile pic')
        // let imageFile = event.target.files[0]
        // const data = new FormData()
        // data.append('profile_pic', imageFile)
        // try {
        //     const {data: {payload}} = await axios.post(`http://localhost:8080/users/update/`, data)
        // } catch (error) {

        // }
    }

    return (

        <div className='settingsPage'>
            <ThemeProvider theme={themeMode} >
                <GlobalStyles />
            </ThemeProvider >

            <h1>Settings</h1>
            <div className='toggleButton'>
                Change Theme
                <Toggle theme={theme} toggleTheme={toggleTheme} />
            </div>

            <p>Edit Profile info</p>
            <form onSubmit={e => {
                fetchData()
                e.preventDefault()
            }} >
                <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)}></input>
                {// <input type="text" placeholder="profile pic url"></input>
                }
                <button onClick={() => setUsername(username)}>Submit</button>
            </form>

            <form noValidate autoComplete="off" onSubmit={handleProfilePicUpdate}>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={useStyles}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span"> Upload Photo </Button>
                </label>
            </form>

            <div className="copyRight">Moon Icon made by<a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                {' '} Sun Icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
            </div>
        </div>
    )
}

export default Settings 
