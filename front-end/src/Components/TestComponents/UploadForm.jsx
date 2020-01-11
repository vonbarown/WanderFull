import React, { Component } from 'react';
import axios from 'axios'

class uploadForm extends Component {
    state = {
        imageUrl: '',
        caption: '',
        hashtag: '',
        location: '',
        imageFile: null
    }

    handleFileInput = e => {
        this.setState({
            imageFile: e.target.files[0],
        })
    }
    handleTextInput = e => {
        this.setState({
            hashtag: e.target.value,
            caption: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        let { imageFile, caption, hashtag } = this.state
        const user_id = sessionStorage.getItem('user_id')

        const data = new FormData()
        data.append('imageUrl', imageFile)
        data.append('caption', caption)
        data.append('hashtag', hashtag)
        data.append('user_id', user_id)


        try {
            const { data: { payload } } = await axios.post('http://localhost:8080/posts/add', data)
            console.log('data', payload);
            this.setState({
                imageUrl: payload.imageUrl
            })

        } catch (error) {
            console.log(error);

        }
    }

    render() {
        console.log(this.state);

        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleFileInput} />
                    <input type="submit" value='upload' />
                    <input name='caption' placeholder='caption' type="text" onChange={this.handleTextInput} />
                    <input name='hashtag' placeholder='hashtag' type="text" onChange={this.handleTextInput} />
                    <input name='location' placeholder='location' type="text" onChange={this.handleTextInput} />
                </form>
                <img src={this.state.imageUrl} />
            </div>
        );
    }
}

export default uploadForm;
