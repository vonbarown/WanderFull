import React, { Component } from 'react'
import Hamburger from '../../Components/Shared/Hamburger'
import axios from 'axios'
import ImageCard from '../../Components/Shared/Cards'
import '../../styles/HomePage.css'
import '../../styles/AppNavBar.css'
import logo from '../../themes/Logo/f537d019-e1b6-4e42-8275-2c9c5c7b8075_200x200.png'
import { Container } from '@material-ui/core'
import UploadModal from './Modal'
import Quote from './Quote'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            feed: true,
            feedArr: [],
            input: '',
            hashtagArr: [],
            loggedIn: false
        }
        // checkStorage()
    }

    componentDidMount() {
        this.checkStorage()
        this.getAllPhotos()
    }

    componentDidUpdate(prevProps, prevState) {
        const { input } = this.state
        if (!input === prevState.input) {
            this.searchHashtag()
        }
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

    getAllPhotos = async () => {
        let allPhotos = `http://localhost:8080/posts/all`
        try {
            const { data: { payload } } = await axios.get(allPhotos)
            //  console.log(payload);
            this.setState({
                feedArr: payload
            })
        } catch (error) {
            console.log(error)
        }
    }

    searchHashtag = async (input) => {
        // const {input} = this.state
        try {
            console.log(input)
            const hashtagImgs = `http://localhost:8080/posts/search/hashtag/${input}`
            const { data: { payload } } = await axios.get(hashtagImgs)
            // let urlsArr = payload.map(el=>{
            //     return el.img
            // })
            this.setState({
                feedArr: payload
            })
            console.log(payload)
        } catch (error) {
            console.log(error)
        }
    }

    searchUser = async () => {
        const { input } = this.state
        try {
            const username = `http://localhost:8080/posts/profile/${input}`
            const { data: { payload } } = await axios.get(username)
            this.setState({
                feedArr: payload
            })
            console.log('user2 info', payload)
        } catch (error) {
            console.log(error)
        }

    }

    handleInput = (event) => {
        console.log('input changing')
        this.setState({
            input: event.target.value
        })
    }

    render() {
        const { feed, feedArr, input } = this.state
        const { handleInput, searchUser, searchHashtag } = this

        return (this.state.loggedIn ? (
            <div className='home'>
                <div className='appNavBar' >
                    <div className='appNavBarItems'>
                        <div className='appName'>
                            <div className='logo'>
                                <img src={logo} alt="logo" />
                                <h3>WanderFull</h3>
                            </div>
                        </div>
                        <div className='hamburger'>
                            <Hamburger
                                handleInput={handleInput}
                                searchUser={searchUser}
                                searchHashtag={searchHashtag}
                                input={input}
                                feed={feed}
                            />
                        </div>
                    </div>
                </div>

                <Quote />

                <Container maxWidth='md' className='feedContainer'>

                    {
                        feedArr.map(el => {
                            console.log(el)
                            return <div className='cards' id={el.username}>
                                <ImageCard
                                    postPic={el.img}
                                    pic={el.profile_pic}
                                    caption={el.caption}
                                    key={el.id}
                                    className='imgCard'
                                    hashtag={el.hashtag}
                                    username={el.username}
                                    postId={el.id}
                                    getAllPhotos={this.getAllPhotos}
                                    home={true}
                                />
                            </div>
                        })
                    }
                </Container>
                <UploadModal className='UploadForm' />
            </div>
        ) : <div>berbter</div>)
    }
}

export default Home