import React, { Component } from 'react'
import Container from './Components/Landing/Container'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'

class App extends Component {
    state = {
        firstRender: true,
        login: false,
        authenticated: false
    }

    handleChange = (event) => {
        console.dir(event.target)
        const { firstRender } = this.state
        if (firstRender) {
            this.switchFirstRender()
        }

        if (event.target.value.includes('Login')) {
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
                    <Route exact path='/' component={this.renderContainer} />
                    {/* {this.state.authenticated && <Route path='/home' component={Home} />}
                    {this.state.authenticated && <Route path='/profile' component={Profile} />} */}
                    <Route path='/home' component={Home} />
                    <Route path='/profile' component={Profile} />
                    <Route component={this.renderContainer} /> 
                </Switch>
            </div>
        )
    }
}

export default App