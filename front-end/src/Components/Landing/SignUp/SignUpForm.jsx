import React, { Component } from 'react'
import Button from '../../Shared/Button'
import axios from 'axios'
import SignUpSide from './Material/SignUpMaterialUI'
import { Redirect } from 'react-router-dom'
class SignUpForm extends Component {
    constructor(props) {
        super()
        this.state = {
            renderComponent: false,
        }
    }

    inputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitSignUp = async (event) => {
        event.preventDefault()
        console.log('Submitting Signup request...')
        const { username, password, firstname, lastname, email } = this.state
        try {
            const data = await axios.post(`http://localhost:8080/register`,
                { username, password, firstname, lastname, email }
            )
            console.log('Data', data.data)
        } catch (err) {
            console.log('Signup failed.')
            console.log(err)
        }
        this.setState({
            renderComponent: true
        })
    }

    render() {
        const { submitSignUp, inputChange } = this
        const { renderComponent } = this.state
        return (
            <div>
                {/* <form onSubmit={submitSignUp}>
                    <input type="text" placeholder="Username" name="username" onChange={ inputChange } />
                    <input type="text" placeholder="Password" name="password" onChange={ inputChange } />
                    <input type="text" placeholder="First name" name="firstname" onChange={ inputChange } />
                    <input type="text" placeholder="Last name" name="lastname" onChange={ inputChange } />
                    <input type="text" placeholder="Email" name="email" onChange={ inputChange } />
                    <Button value='Signup' />
                </form> */}
                {/* <Button
                    value='Login Instead?'
                    handleChange={this.props.handleChange}
                /> */}
                <SignUpSide
                    submitSignUp={submitSignUp}
                    inputChange={inputChange}
                    handleChange={this.props.handleChange}
                />
                {renderComponent ? <Redirect to='/home' /> : null}
            </div>
        )
    }
}

export default SignUpForm