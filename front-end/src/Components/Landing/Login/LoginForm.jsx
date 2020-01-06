import React, { Component } from 'react'
import Button from '../../Shared/Button'
import Home from '../../../pages/Home'


class LoginForm extends Component{ 

 constructor(props){
    super(props)
    this.state = {
        renderComponent: false
    }

 }
    submitLogin = (event) =>{
        event.preventDefault()
        this.setState ({
            renderComponent: true
        })
    }


    render(){
        const {submitLogin} = this
        console.log(this.state)
        const {renderComponent} = this.state
        return(
            <div>
                <form onSubmit = {submitLogin}>
                    <input type="text"/>
                    <Button value = 'Welcome'
                            submitLogin = {submitLogin}    
                    />

                    {
                        renderComponent ? <Home /> : null 
                    }
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