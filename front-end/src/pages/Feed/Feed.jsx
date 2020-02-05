import React, { Component } from 'react'
import axios from 'axios'
import ImageCard from '../../Components/Shared/Cards'
import '../../styles/Feed.css'
import '../../styles/AppNavBar.css'
import { Container } from '@material-ui/core'
import UploadModal from './Modal'
import Quote from './Quote'
import Hamburger from '../../Components/Shared/Hamburger'

class Feed extends Component {
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
        if (!user) {
            window.location.href = '/'
        } else {
            this.setState({ loggedIn: true })
        }
    }

    getAllPhotos = async () => {
        let allPhotos = `https://wanderfull-backend.herokuapp.com/posts/all`
        try {
            const { data: { payload } } = await axios.get(allPhotos)
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
            const hashtagImgs = `https://wanderfull-backend.herokuapp.com/posts/search/hashtag/${input}`
            const { data: { payload } } = await axios.get(hashtagImgs)
            // let urlsArr = payload.map(el=>{
            //     return el.img
            // })
            this.setState({
                feedArr: payload
            })
        } catch (error) {
            console.log(error)
        }
    }

    searchUser = async () => {
        const { input } = this.state
        try {
            const username = `https://wanderfull-backend.herokuapp.com/posts/profile/${input}`
            const { data: { payload } } = await axios.get(username)
            this.setState({
                feedArr: payload
            })
        } catch (error) {
            console.log(error)
        }

    }

    handleInput = (event) => {
        this.setState({
            input: event.target.value
        })
    }

    render() {
        const { feedArr, input } = this.state
        const { handleInput, searchUser, searchHashtag } = this


        return (this.state.loggedIn ? (
            <div className='home'>
                <Quote />
                <div className='hamburger'>
                    <Hamburger
                        handleInput={handleInput}
                        searchUser={searchUser}
                        searchHashtag={searchHashtag}
                        input={input}
                        feed={true}
                    />
                </div>
                <Container maxWidth='md' className='feedContainer' style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}>

                    {
                        feedArr.map(el => {
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
                                    feed={true}
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

export default Feed