import React, { Component } from 'react'
import Button from '../../Shared/Button'
import axios from 'axios'

class SignUpForm extends Component {
    state = {}

    inputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitSignUp = async (event) => {
        event.preventDefault()
        console.log('Submitting Login request...')
        const { username, password, firstname, lastname, email } = this.state
        try {
            const data = await axios.post(`http://localhost:8080/register`,
                { username, password, firstname, lastname, email }
            )
            console.log(data.data)
        } catch (err) {
            console.log('Signup failed.')
            console.log(err)
        }
        // this.setState({
        //     renderComponent: true
        // })
    }

    render() {
        const { submitSignUp } = this
        return (
            <div>
                <form onSubmit={submitSignUp}>
                    <input type="text" placeholder="Username" name="username" onChange={ this.inputChange } />
                    <input type="text" placeholder="Password" name="password" onChange={ this.inputChange } />
                    <input type="text" placeholder="First name" name="firstname" onChange={ this.inputChange } />
                    <input type="text" placeholder="Last name" name="lastname" onChange={ this.inputChange } />
                    <input type="text" placeholder="Email" name="email" onChange={ this.inputChange } />
                    <Button value='Welcome' />
                </form>
                <Button
                    value='Login'
                    handleChange={this.props.handleChange}
                />
            </div>
        )
    }
}

export default SignUpForm