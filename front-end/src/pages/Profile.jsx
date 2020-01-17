import axios from 'axios'
import React, { Component } from 'react'
import UserAvatar from '../Components/Shared/Avatar'
import NavBar from '../Components/Profile/NavBar'
import ImageCard from '../Components/Shared/Cards'
import { Container } from '@material-ui/core'
import { Buds } from '../Components/Profile/Buds'
import '../styles/profile.css'
class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            album: [],
            loggedIn: false
        }
    }

    componentDidMount() {
        this.getUserAlbum()
        this.checkStorage()
    }

    checkStorage = () => {
        const user = sessionStorage.getItem('user')
        console.log(user)
        if (!user) {
            window.location.href = '/'
        } else {
            this.setState({ loggedIn: true })
        }
    }

    // Retrieves all the pictures that a user uploaded
    getUserAlbum = async () => {
        let username = sessionStorage.getItem('user')
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

    renderNavBar() {
        return <Buds />
    }

    render() {
        const { album } = this.state
        const username = sessionStorage.getItem('user')
        const profile_pic = sessionStorage.getItem('profile_pic')
        console.log(this.state);


        return (this.state.loggedIn ? (
            <div className='profile'>
                <div className='header'>
                    <div className='top'>
                        <UserAvatar pic={profile_pic} class_name={'classes.large'} userName={username} />
                    </div>
                    <NavBar renderNavBar={this.renderNavBar} />
                </div>
                <Container maxWidth='lg' className='imgContainer'>
                    {
                        album.map(el => {
                            let time_post = el.time_post.replace('T05:00:00.000Z', '')
                            return <div className='profileCard' id={el.username}>
                                <ImageCard
                                    key={el.caption}
                                    postPic={el.img}
                                    username={username}
                                    pic={profile_pic}
                                    caption={el.caption}
                                    hashtag={el.hashtag}
                                    time_post={time_post}
                                    postOwner={el.username}
                                    postId={el.id}
                                />
                            </div>
                        })

                    }
                </Container>
            </div>
        ) : <div></div>)
    }
}

export default Profile
