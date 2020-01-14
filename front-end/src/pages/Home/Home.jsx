import React, { Component } from 'react'
import Hamburger from '../../Components/Shared/Hamburger'
import axios from 'axios'
import ImageCard from '../../Components/Shared/Cards'
import '../../styles/HomePage.css'
import { Container } from '@material-ui/core'
import UploadModal from './Modal'
class Home extends Component {
    constructor() {
        super()
        this.state = {
            feed: true,
            feedArr: [],
            input: '',
            hashtagArr: []
        }
    }

    componentDidMount() {
        this.getAllPhotos()
        // this.searchHashtag()
    }

    componentDidUpdate(prevProps, prevState) {
        const { input } = this.state
        if (!input === prevState.input) {
            this.searchHashtag()

        }
    }

    getAllPhotos = async () => {
        let allPhotos = `http://localhost:8080/posts/all`
        try {
            const { data: { payload } } = await axios.get(allPhotos)
            console.log(payload);
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
        //console.log('state', this.state)
        //console.log('storage', window.sessionStorage);

        const { feed, feedArr, input } = this.state
        const { handleInput, searchUser, searchHashtag } = this
        return (
            <div className='home'>
                <div className='nav'>
                    <div className='header'>
                        <h1>WanderFull</h1>
                    </div>
                    <div className='hamburger'>
                        <Hamburger
                            handleInput={handleInput}
                            searchUser={searchUser}
                            searchHashtag={searchHashtag}
                            input={input}
                            feed={feed} />
                    </div>
                </div>


                <Container maxWidth='md' className='feedContainer'>

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
                                    postOwner={el.username}
                                />
                            </div>
                        })
                    }
                </Container>



                <UploadModal className='UploadForm' />
            </div>
        )
    }
}

export default Home