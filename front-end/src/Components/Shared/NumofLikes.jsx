import React, {Component} from 'react';
import axios from 'axios';

class NumOfLikes extends Component {
    constructor(props) {
        super(props)
        this.state ={
            numOfLikes:''
        }
    }

    componentDidMount(){
        this.getNumOfLikes()
    }


    getNumOfLikes = async () => {
        try {
            const { data:{payload} } = await axios.get(`http://localhost:8080/likes/${this.props.postId}`)
            this.setState({
                numOfLikes:payload.length
            })
         } catch (error) {
             console.log(error)
         }
    }
    render () {
        return (
            <p>{this.state.numOfLikes}</p>
        )
    }
}

export default NumOfLikes;