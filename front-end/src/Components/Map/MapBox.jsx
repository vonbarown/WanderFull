import React, { Component } from 'react'
import ReactMapGl, { NavigationControl, Marker } from 'react-map-gl'
import ApiKey from './apiKey'
import signpost from '../../themes/icons/signpost.svg'
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
      },
      userLocation: {}
    }
  }


  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let userLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
      let newViewport = {
        height: "100vh",
        width: "100vw",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 12
      }
      this.setState({
        viewport: newViewport,
        userLocation: userLocation
      })
    })
  }

  render() {
    console.log(this.state);

    return (
      <div className='mapContainer'>
        <button onClick={this.setUserLocation}>My Location</button>
        <div className='map-display'>
          <ReactMapGl
            {...this.state.viewport}
            mapStyle='mapbox://styles/mapbox/outdoors-v11'
            onViewportChange={(viewport =>
              this.setState({ viewport }))} mapboxApiAccessToken={ApiKey}
          >
            {Object.keys(this.state.userLocation).length !== 0 ? (
              <Marker
                latitude={this.state.viewport.latitude}
                longitude={this.state.viewport.longitude}
              >
                <img className='location-icon' src={signpost} />
              </Marker>
            ) : (<div />)
            }
            <NavigationControl />
          </ReactMapGl>
        </div>
      </div>
    )
  }
}

export default MapBox