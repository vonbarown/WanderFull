import React, { Component } from 'react'
import ApiKey from './apiKey'
import './MapBox.css'
import geocoder from 'geocoder'

class GoogleMap extends Component {

    componentDidMount() {
        this.renderMap()
        this.geocoder()
    }

    renderMap = () => {
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${ApiKey}&callback=initMap`)
        window.initMap = this.initMap
    }

    initMap = () => {
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        })
    }

    geocoder() {
        let code = geocoder.geocode("Atlanta, GA", function (err, data) {
            return data
        });

        console.log(code);
    }

    render() {
        return (
            <main>
                <div id="map" className='map'></div>
            </main>
        )
    }
}

function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}

export default GoogleMap;

