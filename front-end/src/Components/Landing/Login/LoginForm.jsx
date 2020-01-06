import React, { Component } from 'react'
import Button from '../../Shared/Button'
import Home from '../../../pages/Home'


class LoginForm extends Component{ 

 
    submitLogin = (event) =>{
        event.preventDefault()
        console.log('ok')
        return (
            <Home />
        )
        
    }

//    componentWillUnmount(){
//        this.submitLogin()
//    }

    render(){
        const {submitLogin} = this
        return(
            <div>
                <form onSubmit = {submitLogin}>
                    <input type="text"/>
                    <Button value = 'Welcome'
                            submitLogin = {submitLogin}    
                    />
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