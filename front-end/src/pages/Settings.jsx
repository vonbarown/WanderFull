import React from 'react'
import '../styles/settings.css'




const handleSubmit = (event) => {
    // make patch network request to /users endpoint
    // event.preventDefault()
    console.log('form was submitted')
}

const Settings = () => {
    return (
        <div className='settingsPage'>
            <h1>Settings</h1>
            <p>Dark Theme<button>on/off</button></p>
            <p>Edit Profile info</p>
            <form onSubmit={handleSubmit()}>
                <input type="text" placeholder="username"></input>
                <input type="text" placeholder="profile pic url"></input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Settings 
