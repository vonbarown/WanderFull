import React, { Component } from 'react'
import UserAvatar from '../Shared/Avatar'
import NavBar from './NavBar'

class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            album: []
        }
    }

    // Fetch pictures when the component get uppdated
    componentDidUpdate = (prevProps, prevState) => {
        const { album } = this.state
        if (album !== prevState.album) {
            this.getUserAlbum()
        }
    }

    // Retrieves all the pictures that a user uploaded
    getUserAlbum = async () => {
        let { album } = this.state
        try {
            const { data } = await axios.get(`http://localhost:8080/images/home`)
            console.log(data.payload);

            this.setState({
                album: data.payload
            })
        } catch (error) {
            console.log(error);

        }
    }

    render() {
        return (
            <div className='profile'>
                <UserAvatar UserAvatar={'placeholder'} class_name={classes.large} />
                <NavBar />
            </div>
        )
    }
}

export default Profile
