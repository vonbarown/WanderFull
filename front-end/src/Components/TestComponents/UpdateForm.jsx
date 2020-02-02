import React, { Component } from 'react'
import axios from 'axios'

class UpdateForm extends Component {
    constructor() {
        super()
        this.state = {
            caption: '',
            hashtag: ''
        }
    }

    handleInput = (event) => {
        const value = event.target.value
        this.setState({
            ...this.prevState,
            [event.target.name]: value
        })

    }

    updatePost = async (event) => {
        let { hashtag, caption } = this.state
        // let newInfo = {
        //     hashtag: hashtag,
        //     caption: caption
        // }
        // let postId = props.postId

        try {
            const { data: { payload } } = await axios.patch(`http://localhost:8080/posts/update/${this.props.postId}`,
                {
                    hashtag: hashtag,
                    caption: caption
                })
            this.props.getAllPhotos()
        } catch (error) {
            console.log(error)
        }
    }

    render() {


        return (
            <div>
                <form onSubmit={e => e.preventDefault()}>
                    <input name='caption' type='text' placeholder='caption' onChange={this.handleInput} />
                    <input name='hashtag' type='text' placeholder='hashtag' onChange={this.handleInput} />
                    <button onClick={this.updatePost}> Submit!</button>
                </form>
            </div>
        )

    }


}

export default UpdateForm