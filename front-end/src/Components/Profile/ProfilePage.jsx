import React, { Component } from 'react'
import UserAvatar from '../Shared/Avatar'
import NavBar from './NavBar'

class Profile extends Component {

    render() {
        return (<div className='profile'>
            <UserAvatar UserAvatar={'placeholder'} class_name={classes.large} />
            <NavBar />
        </div>)
    }
}

export default Profile