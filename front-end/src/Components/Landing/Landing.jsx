import React, { Component } from 'react'
import Container from './Container'
import { Switch, Route } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import Profile from '../../pages/Profile'
import { Buds } from '../../Components/Profile/Buds'
import Settings from '../../pages/Settings'
import AppNavBar from '../Shared/AppNavBar'
import './Landing.css'

import Upload from '../TestComponents/UploadForm'
// import GoogleMap from '../Map/Map'
// import MapBox from '../Map/MapBox'
// import MapContainer from '../Map/MapOfficial'

class Landing extends Component {
    state = {
        firstRender: false,
        login: true
    }

    handleChange = (event) => {
        const { firstRender } = this.state
        console.log(event.target.value)
        console.log(event.target.innerText)

        if (firstRender) {
            this.switchFirstRender()
        }

        if (event.target.innerText.includes('Login')) {
            this.setState({
                login: true
            })
        } else {
            this.setState({
                login: false
            })
        }
    }

    handleLogout = () => {
        console.clear()
        console.log('Logout')
        console.log(this.props)
        // this.props.history.push('/asdf')
    }

    switchFirstRender = () => {
        this.setState({
            firstRender: false
        })
    }

    renderContainer = (routeProps) => {
        // console.log(routeProps)
        const { firstRender, login, signUp } = this.state
        const { handleChange, submitLogin, handleLogout } = this
        return (
            <Container
                id="container"
                submitLogin={submitLogin}
                handleChange={handleChange}
                firstRender={firstRender}
                login={login}
                signUp={signUp}
                handleLogout={handleLogout}
            />
        )
    }

    render() {
        console.log('Landing props:', this.props)

        return (

            <div>
                <Switch>
                    <Route path='/home' component={Home} />
                    {  // <Route path='/geocode' component={MapContainer} />
                    }
                    {!!sessionStorage.getItem('user') && (
                        <>
                            <Route path='/buds' component={Buds} />
                            <Route path='/upload' component={Upload} />
                            <AppNavBar>
                                <Route path='/profile' component={Profile} />
                                <Route path='/settings' component={Settings} />
                            </AppNavBar>
                        </>

                    )}
                    <Route path='/' component={this.renderContainer} />
                </Switch>
            </div>
        )
    }
}

export default Landing