import React, { Component } from 'react'
import Hamburger from '../Components/Shared/Hamburger'
import axios from 'axios'
import ImageCard from '../Components/Shared/Cards'
import '../styles/HomePage.css'
import { Container } from '@material-ui/core'
import { EventEmitter } from 'events'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            feed: true,
            feedArr: [],
            input: ''
        }
    }

    componentDidMount() {
        this.getAllPhotos()
        this.searchHashtag()
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

    searchHashtag  = async () => {
        try {
            let tag = 'this'
            const hashtagImgs = `http://localhost:8080/posts/search/hashtag/${tag}`
            const { data:{payload} }  = await axios.get(hashtagImgs)
            console.log(payload)
        } catch (error){
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
        console.log(this.state)
        const { feed, feedArr } = this.state
        const {handleInput} = this
        return (
            <div>
                <div className='nav'>
                    <Hamburger
                        handleInput = {handleInput}
                        feed={feed} />
                </div>
                <div className='header'>
                    <h1>WanderFull</h1>
                </div>

               
                <Container maxWidth='sm' className='feedContainer'>

                    {
                        feedArr.map(el => {
                            return <ImageCard
                                postPic={el.img}
                                pic={'https://media.newyorker.com/photos/5e06335ca15be900089fe632/master/pass/Brody-CatsReview.jpg'}
                                caption={el.caption}
                                key={el.id}
                                className = 'imgCard'
                            />
                        })
                    }
                    </Container>
            



            </div>
        )
    }
}

export default Home