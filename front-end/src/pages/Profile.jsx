import React, { Component } from 'react'
import UserAvatar from '../Components/Shared/Avatar'
import NavBar from '../Components/Profile/NavBar'
import axios from 'axios'
import '../styles/profile.css'
class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            album: []
        }
    }

    // Fetch pictures when the component get updated
    componentDidUpdate = (prevProps, prevState) => {
        const { album } = this.state
        if (album !== prevState.album) {
            this.getUserAlbum()
        }
    }

    // Retrieves all the pictures that a user uploaded
    getUserAlbum = async () => {
        // let { album } = this.state
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
                <UserAvatar pic={'https://media.newyorker.com/photos/5e06335ca15be900089fe632/master/pass/Brody-CatsReview.jpg'} class_name={'classes.large'} userName={"Test"} />
                <NavBar />
            </div>
        )
    }
}

export default Profile
