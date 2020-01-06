import React, { Component } from 'react'
import Button from '../../Shared/Button'

class LoginForm extends Component{ 

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