import React, { Component } from 'react'
import axios from 'axios'

class TestPage extends Component {
    state = {
        imgFile: null,
        imgUrl: ''
    }

    uploadImg = async (e) => {
        e.preventDefault()
        console.log('Upload Requested')

        const file = new FormData()
        file.append('image', this.state.imgFile)

        try {
            const data = await axios.post('http://localhost:8080/upload', file)
            console.log(data.data)
            this.setState({imgUrl: data.data.imageUrl})
            console.log('Upload Successul')
        } catch (err) {
            console.error(err)
            console.log('Upload Unsuccessful')
        }
    }

    changeFile = (e) => {
        console.log('File Updated')
        console.dir(e.target)
        this.setState({imgFile: e.target.files[0]})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.uploadImg}>
                    <input type="file" onChange={this.changeFile} />
                    <input type="submit" value="Upload" />
                </form>
                {this.state.imgUrl ? <img src={this.state.imgUrl} alt="uploaded" /> : null}
            </div>
        )
    }
}

export default TestPage