import React, { Component } from 'react'
import Geocode from 'react-geocode';
import { mapKey } from './apiKey';


class GeoCoder extends Component {

    constructor() {
        super()
        this.state = {
            location: ''
        }
    }


    componentDidMount() {
        this.geoCodeSetUp()
    }

    geoCodeSetUp = () => {
        Geocode.setApiKey(mapKey);

        Geocode.setLanguage("en");

        Geocode.enableDebug();

        const test = Geocode.fromAddress("Eiffel Tower").then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
            },
            error => {
                console.error(error);
            }
        );

        return test
    }

    render() {
        return (
            <div></div>
        )
    }

}

export default GeoCoder

