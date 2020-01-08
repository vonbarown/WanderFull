import React, { Component } from 'react'
import Button from '../../Shared/Button'
import Home from '../../../pages/Home'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

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
            const data = await axios.post(`http://localhost:8080/users/authenticate`, { username, password })
            console.log(data.data)
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
        return (
            <div>
                <form onSubmit={this.submitLogin}>
                    <input type="text" placeholder="Username" name="username" onChange={this.inputChange} />
                    <input type="text" placeholder="Password" name="password" onChange={this.inputChange} />
                    <button>Login</button>
                </form>
                <Button
                    value='Sign up'
                    handleChange={this.props.handleChange} // TODO
                />
                {renderComponent ? <Redirect to='/home' /> : null}
            </div>
        )
    }
}

export default LoginForm