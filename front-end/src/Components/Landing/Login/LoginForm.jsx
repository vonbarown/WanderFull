import React, { Component } from 'react'
import Button from '../Button'

class LoginForm extends Component{ 
    constructor (props){
        super(props)
    }

    submitLogin = (event) =>{
        event.preventDefault()
    }

    render(){
        const {submitLogin} = this
        return(
            <div>
                <form onSubmit = {submitLogin}>
                    <input type="text"/>
                    <Button value = 'Welcome'/>
                </form>
                <Button 
                    value = 'Sign up'
                    handleChange = {this.props.handleChange}
                />
            </div>
        )
     }
    }

export default LoginForm