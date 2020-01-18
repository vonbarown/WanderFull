import React from 'react'
import axios from 'axios'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../themes/theme'
import { GlobalStyles } from '../themes/global'
import Toggle from '../themes/Toggler'
import { useDarkMode } from '../themes/useDarkMode'
import '../styles/settings.css'
import {TextField} from '@material-ui/core';
import { Button } from '@material-ui/core';


const useStyles = {
  display: 'none',
}


const Settings = () => {

    const [theme, toggleTheme, componentMounted] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    if (!componentMounted) {
        return <div />
    }

    const handleUserNameUpdate = async (event) => {
        event.preventDefault()
        console.log('updating username')
        
        // try {
            
        // } catch (error) {

        // }
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


    // render() {
    return (

        

        <div className='settingsPage'>
            <ThemeProvider theme={themeMode} >
                <GlobalStyles />
            </ThemeProvider >

                <h1>Settings</h1>
                <div className='toggleButton'>
                <h3>Change Theme</h3> <Toggle theme={theme} toggleTheme={toggleTheme} />
                </div>
     
                <form  noValidate autoComplete="off" onSubmit={handleUserNameUpdate}>
                <h3>Change UserName</h3>
                <TextField label="Old Username" variant="outlined"/><TextField label="New Username" variant="outlined" /><Button variant="contained">Submit</Button>
                </form>

                <form  noValidate autoComplete="off" onSubmit={handleProfilePicUpdate}>
                <h3>Change Profile Picture</h3>   
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
    // }
}

export default Settings 
