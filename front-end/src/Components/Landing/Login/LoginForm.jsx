import React, { Component } from 'react'
// import Home from '../../../pages/Home'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import SignInSide from './Material/LoginMaterialUI'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            renderComponent: false,
        }
    }

    submitLogin = async (event) => {
        event.preventDefault()
        console.log('Submitting Login request...')
        const { username, password } = this.state
        try {
            const { data: { payload } } = await axios.post(`/api/login`, { username, password })
            console.log('data', payload)
            sessionStorage.setItem('user', username)
            sessionStorage.setItem('profile_pic', payload.profile_pic)
            sessionStorage.setItem('user_id', payload.id)

            this.setState({
                renderComponent: true
            })
        } catch (err) {
            console.log('Login failed.')
            console.log(err)
        }

    }

    inputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        // console.log(this.state)
        const { renderComponent } = this.state
        const { submitLogin, inputChange } = this
        return (
            <div>
                <SignInSide
                    submitLogin={submitLogin}
                    inputChange={inputChange}
                    handleChange={this.props.handleChange}
                />
                {renderComponent ? <Redirect to='/home' /> : null}
            </div>
        )
    }
}

export default LoginForm