import React, { Component } from 'react';
import axios from 'axios';

class NumOfLikes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numOfLikes: ''
        }
    }

    componentDidMount() {
        this.getNumOfLikes()
    }


    getNumOfLikes = async () => {
        try {
            const { data } = await axios.get(`/api/likes/posts/times_liked`)
            // this.setState({
            //     numOfLikes: payload.length
            // })
            console.log('timesLiked', data);

        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <p>{this.state.numOfLikes}</p>
        )
    }
}

export default NumOfLikes;