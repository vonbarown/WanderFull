import React, { Component } from 'react';
import Geocode from 'react-geocode'
import axios from 'axios'
import ApiKey from '../Map/apiKey'

class uploadForm extends Component {
    state = {
        imageUrl: '',
        caption: '',
        hashtag: '',
        local: '',
        imageFile: null,
        coords: {
            latitude: '',
            longitude: ''
        }
    }

    handleFileInput = e => {
        this.setState({
            imageFile: e.target.files[0],
        })
    }
    handleTextInput = e => {
        const value = e.target.value;
        this.setState({
            ...this.prevState,
            [e.target.name]: value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.local !== prevState.local) {
            this.geoCodeSetUp()
        }
    }
    geoCodeSetUp = () => {
        console.log('hit');

        Geocode.setApiKey(ApiKey);

        Geocode.setLanguage("en");

        Geocode.enableDebug();

        const { local } = this.state

        const test = Geocode.fromAddress(local).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                this.setState({
                    coords: {
                        latitude: lat,
                        longitude: lng
                    }
                })
            },
            error => {
                console.error(error);
            }
        );

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
                    <input name='local' placeholder='location' type="text" onChange={this.handleTextInput} />
                </form>
                <img src={this.state.imageUrl} alt="null" />
            </div>
        );
    }
}

export default uploadForm;
