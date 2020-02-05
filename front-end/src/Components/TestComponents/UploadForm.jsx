import React, { Component } from 'react';
import Geocode from 'react-geocode'
import axios from 'axios'
const mapKey = process.env.MAP_API_KEY


Geocode.setApiKey(mapKey);

Geocode.setLanguage("en");

Geocode.enableDebug();

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
        },
        setInput: false
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

    geoCodeSetUp = async () => {
        const { local } = this.state

        try {
            let res = await Geocode.fromAddress(local)
            const { lat, lng } = res.results[0].geometry.location;
            console.log(lat, lng);
            this.setState({
                coords: {
                    latitude: lat,
                    longitude: lng
                }
            })
        } catch (error) {
            console.log(error);

        }


    }

    handleSubmit = async (e) => {
        e.preventDefault()

        await this.geoCodeSetUp()
        let { imageFile, caption, hashtag, coords } = this.state
        const user_id = sessionStorage.getItem('user_id')

        const data = new FormData()
        data.append('imageUrl', imageFile)
        data.append('caption', caption)
        data.append('hashtag', hashtag)
        data.append('user_id', user_id)
        data.append('coords', JSON.stringify(coords))


        try {
            const { data: { payload } } = await axios.post('/api/posts/add', data)
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

        console.log(JSON.stringify(this.state.coords));


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
