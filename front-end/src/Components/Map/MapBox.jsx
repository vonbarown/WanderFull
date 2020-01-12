import React, { Component } from 'react'
import ReactMapGl from 'react-map-gl'
import ApiKey from './apiKey'

class MapBox extends Component {
  constructor() {
    super()
    this.state = {
      viewport: {
        width: '100vw',
        height: '100vh',
        latitude: 42.430472,
        longitude: -123.334102,
        zoom: 16
      }
    }
  }


  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let newViewport = {
        height: "100vh",
        width: "100vw",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 12
      }
      this.setState({
        viewport: newViewport
      })
    })
  }

  render() {
    return (
      <div className='mapContainer'>
        <button onClick={this.setUserLocation}>My Location</button>
        <div className='map-display'>
          <ReactMapGl {...this.state.viewport} mapStyle='mapbox://styles/mapbox/outdoors-v11' onViewportChange={(viewport =>
            this.setState({ viewport }))} mapboxApiAccessToken={ApiKey}>
          </ReactMapGl>
        </div>
      </div>
    )
  }
}

export default MapBox