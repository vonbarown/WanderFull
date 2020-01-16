import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import ApiKey from "./apiKey";
import axios from 'axios'

import './MapBox.css'
const mapStyles = {
    width: '100vw',
    height: '100vh',
    marginRight: '0',
    position: 'absolute'
};


export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: [
                // { lat: 47.49855629475769, lng: -122.14184416996333 },
                // { latitude: 47.359423, longitude: -122.021071 },
                // { latitude: 47.2052192687988, longitude: -121.988426208496 },
                // { latitude: 47.6307081, longitude: -122.1434325 },
                // { latitude: 47.3084488, longitude: -122.2140121 },
                // { latitude: 47.5524695, longitude: -122.0425407 },
                // { latitude: 48.85837009999999, longitude: 2.2944813 }
            ]
        }
    }

    componentDidMount() {
        this.loadCoords()
    }

    loadCoords = async () => {

        try {
            const { data: { payload } } = await axios.get(`http://localhost:8080/posts/all/coords/${sessionStorage.getItem('user')}`)
            console.log('data', payload);
            this.setState({
                stores: payload
            })

        } catch (error) {
            console.log(error);

        }
    }

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: parseFloat(store.coords.latitude),
                lng: parseFloat(store.coords.longitude)
            }}
                onClick={() => console.log("You clicked me!")} />
        })
    }

    render() {
        return (
            <div className='mapContainer'>
                <Map
                    google={this.props.google}
                    zoom={8}
                    style={mapStyles}
                    initialCenter={{ lat: 47.444, lng: -122.176 }}
                >
                    {this.displayMarkers()}
                </Map>

            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ApiKey
})(MapContainer);
