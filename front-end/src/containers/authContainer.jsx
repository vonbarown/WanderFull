import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LoginForm } from '../Components/Landing/Material/LoginMaterialUI'
import { SignupForm } from '../Components/Landing/Material/SignUpMaterialUI'
import axios from 'axios'

class AuthContainer extends Component {
    state = {
        username: '',
        password: ''
    }
    // async componentDidMount() {
    //     try {
    //         const { data } = await axios.get('/auth/isUserLoggedIn')
    //         this.props.setUser(data.payload)
    //     } catch (err) {
    //         console.log('ERROR', err)
    //     }
    // }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    signupUser = async (user) => {
        try {
            const { data } = await axios.post('/auth/signup', this.state)

            this.props.setUser(data.payload)

        } catch (error) {
            console.log(error);

        }

    }

    loginUser = async () => {
        try {
            const { data } = await axios.post('api/auth/login', this.state)

            this.props.setUser(data.payload)
            this.props.history.push('/home')
        } catch (error) {
            console.log(error);

        }
    }

    renderSignupForm = () => {
        const { username, password } = this.state
        return (
            <SignupForm
                handleChange={this.handleChange}
                username={username}
                password={password}
                signupUser={this.signupUser}
            />
        )
    }

    renderLoginForm = () => {
        const { username, password } = this.state
        return (
            <LoginForm
                handleChange={this.handleChange}
                username={username}
                password={password}
                loginUser={this.loginUser}
            />
        )
    }

    checkUserLoggedIn = () => {

    }

    render() {
        return (
            <div>
                {
                    this.props.isUserLoggedIn
                        ? <Redirect to='/profile' />
                        : (
                            <Switch>
                                <Route path='/login' component={this.renderLoginForm} />
                                <Route path='/signup' render={this.renderSignupForm} />
                            </Switch>
                        )
                }
            </div>
        )
    }
}

export default AuthContainer