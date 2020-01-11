import React, { Component } from 'react';
import axios from 'axios'

class uploadForm extends Component {
    state = {
        imageUrl: '',
        imageFile: null
    }

    handleFileInput = e => {
        // console.dir(e.target);

        this.setState({
            imageFile: e.target.files[0]
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('imageURL', this.state.imageFile)

        try {
            const res = await axios.post('http://localhost:8080/posts/add', data)
            console.log(res.data);
            this.setState({
                imageUrl: res.data.imageUrl
            })

        } catch (error) {
            console.log(error);

        }
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleFileInput} />
                    <input type="submit" value='upload' />
                </form>
                <img src={this.state.imageUrl} alt="null" />
            </div>
        );
    }
}

export default uploadForm;
