import axios from 'axios'
import React, { Component } from 'react'
import UserAvatar from '../Components/Shared/Avatar'
import NavBar from '../Components/Profile/NavBar'
import ImageCard from '../Components/Shared/Cards'
import Hamburger from '../Components/Shared/Hamburger'
import { Container } from '@material-ui/core'
import { Buds } from '../Components/Profile/Buds'
import '../styles/profile.css'
class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            album: [
                {
                    caption: "Japanese street food",

                    hashtag: "#japan",

                    img: "https://3tsll33cscvk11pae33oze51-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/tokyo-street-food-takoyaki.png",

                    username: "Voniel"
                },
                {
                    caption: "Japanese street food",

                    hashtag: "#japan",

                    img: "https://3tsll33cscvk11pae33oze51-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/tokyo-street-food-takoyaki.png",

                    username: "Voniel"
                },
                {
                    caption: "Japanese street food",

                    hashtag: "#japan",

                    img: "https://3tsll33cscvk11pae33oze51-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/tokyo-street-food-takoyaki.png",

                    username: "Voniel"
                }
                ,
                {
                    caption: "Japanese street food",

                    hashtag: "#japan",

                    img: "https://3tsll33cscvk11pae33oze51-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/tokyo-street-food-takoyaki.png",

                    username: "Voniel"
                }

            ]
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

    renderNavBar() {
        return <Buds />
    }

    render() {
        const { album } = this.state
        const username = sessionStorage.getItem('user')
        const profile_pic = sessionStorage.getItem('profile_pic')

        return (
            <div className='profile'>
                <div className='header'>
                    <div className='top'>
                        <UserAvatar pic={profile_pic} class_name={'classes.large'} userName={username} />
                        <Hamburger />
                    </div>
                    <NavBar renderNavBar={this.renderNavBar} />
                </div>
                <Container maxWidth='lg' className='imgContainer'>
                    {
                        album.map(el => {
                            return <ImageCard
                                postPic={el.img}
                                pic={profile_pic}
                                caption={el.caption}
                                hashtag={el.hashtag}
                            />
                        })

                    }
                </Container>
            </div>
        )
    }
}

export default Profile
