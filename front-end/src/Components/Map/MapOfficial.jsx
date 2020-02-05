import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios'
import { connect } from 'react-redux'
import { loadMap } from '../../Store/Actions/mapActions'

import './MapBox.css'
const mapStyles = {
    width: '100vw',
    height: '100vh',
    marginRight: '0',
    position: 'absolute'
};


export class MapContainer extends Component {

    componentDidMount() {
        this.loadCoords()
    }

    loadCoords = async () => {

        try {
            const { data: { payload } } = await axios.get(`https://wanderfull-backend.herokuapp.com/posts/all/coords/${sessionStorage.getItem('user')}`)
            console.log('data', payload);
            this.props.loadMap(...payload)

        } catch (error) {
            console.log(error);

        }
    }

    displayMarkers = () => {
        return this.props.mapReducer.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.coords.latitude,
                lng: store.coords.longitude
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
                    initialCenter={{ lat: 40.748817, lng: -73.985428 }}
                >
                    {this.displayMarkers()}
                </Map>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log('state', state);

    return {
        mapReducer: state.mapReducer.stores
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadMap: data => dispatch(loadMap(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: process.env.MAPS_API_KEY
})(MapContainer))
