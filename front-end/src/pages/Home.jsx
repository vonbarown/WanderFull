import React, { Component } from 'react'
import Hamburger from '../Components/Shared/Hamburger'
import axios from 'axios'
import ImageCard from '../Components/Shared/Cards'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            feed: true,
            feedArr: []
        }
    }

    componentDidMount() {
        this.getAllPhotos()
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

    render() {
        const { feed, feedArr } = this.state
        return (
            <div>
                <Hamburger
                    feed={feed} />
                <h1></h1>

                {
                    feedArr.map(el => {
                        return <ImageCard
                         postPic={el.img} 
                         pic={'https://media.newyorker.com/photos/5e06335ca15be900089fe632/master/pass/Brody-CatsReview.jpg'}
                         caption = {el.caption}
                         key={el.username}
                         />
                    })

                }
            </div>
        )
    }
}

export default Home