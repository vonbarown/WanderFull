import React, { Component } from 'react'
import ReactMapGl from 'react-map-gl'
import ApiKey from './apiKey'

class MapBox extends Component {

  state = {
    viewport: {
      width: '100vw',
      height: '100vh',
      latitude: 42.430472,
      longitude: -123.334102,
      zoom: 16
    }
  }


  render() {
    return (
      <div className='map'>
        <ReactMapGl {...this.state.viewport} mapStyle='mapbox://styles/mapbox/outdoors-v11' onViewportChange={(viewport =>
          this.setState({ viewport }))} mapboxApiAccessToken={ApiKey}>
        </ReactMapGl>

      </div>
    )
  }
}

export default MapBox