import axios from 'axios'
import React, { Component } from 'react'
import UserAvatar from '../Components/Shared/Avatar'
import NavBar from '../Components/Profile/NavBar'
import ImageCard from '../Components/Shared/Cards'
import '../styles/profile.css'
class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            album: []
        }
    }

    componentDidMount() {
        this.getUserAlbum()
    }

    // Retrieves all the pictures that a user uploaded
    getUserAlbum = async () => {
        let username = 'Voniel'
        let { album } = this.state
        try {
            const { data } = await axios.get(`http://localhost:8080/posts/profile/${username}`, {
                params: {
                    username: username
                }
            })
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
                <div className='header'>
                    <UserAvatar pic={'https://media.newyorker.com/photos/5e06335ca15be900089fe632/master/pass/Brody-CatsReview.jpg'} class_name={'classes.large'} userName={"Test"} />
                    <NavBar />
                    <ImageCard pic={'https://media.newyorker.com/photos/5e06335ca15be900089fe632/master/pass/Brody-CatsReview.jpg'} />
                </div>
            </div>
        )
    }
}

export default Profile
