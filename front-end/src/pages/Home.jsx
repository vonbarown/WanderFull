<<<<<<< HEAD
import React,{ Component } from 'react'
import Hamburger from '../Components/Shared/Hamburger'
=======
import React, { Component } from 'react'
>>>>>>> e575bd0deb2c164310a5010efab717806499778c
import axios from 'axios'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            feed: true
        }
    }

    componentDidMount() {
        this.getAllPhotos()
    }

    getAllPhotos = async () => {
        let allPhotos = `http://localhost:8080/images`
        try {
            const { data: { payload } } = await axios.get(allPhotos)
            console.log(payload);
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {feed} = this.state
        return (
            <div>
                <Hamburger 
                feed = {feed}/>
                <h1>Home</h1>
            </div>
        )
    }
}

export default Home