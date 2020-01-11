import React, { Component } from 'react'
import Container from './Container'
import { Switch, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Profile from '../../pages/Profile'
import { Buds } from '../../Components/Profile/Buds'
import Settings from '../../pages/Settings'
import Upload from '../TestComponents/UploadForm'

class Landing extends Component {
    state = {
        firstRender: true,
        login: false
    }

    handleChange = (event) => {
        const { firstRender } = this.state
        if (firstRender) {
            this.switchFirstRender()
        }

        if (event.target.value === 'Login') {
            this.setState({
                login: true
            })
        } else {
            this.setState({
                login: false
            })
        }
    }


    switchFirstRender = () => {
        this.setState({
            firstRender: false
        })
    }

    renderContainer = (routeProps) => {
        // console.log(routeProps)
        const { firstRender, login, signUp } = this.state
        const { handleChange, submitLogin } = this
        return (
            <Container
                submitLogin={submitLogin}
                handleChange={handleChange}
                firstRender={firstRender}
                login={login}
                signUp={signUp}
            />
        )
    }

    render() {

        return (

            <div>
                <Switch>
                    <Route path='/home' component={Home} />
                    {!!sessionStorage.getItem('user') && (
                        <>
                            <Route path='/profile' component={Profile} />
                            <Route path='/buds' component={Buds} />
                            <Route path='/settings' component={Settings} />
                            <Route path='/upload' component={Upload} />
                        </>

                    )}
                    <Route path='/' component={this.renderContainer} />
                </Switch>
            </div>
        )
    }
}

export default Landing