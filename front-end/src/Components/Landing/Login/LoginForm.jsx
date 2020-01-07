import React, { Component } from 'react'
import Button from '../../Shared/Button'
import Home from '../../../pages/Home'
import { Redirect } from 'react-router-dom'



class LoginForm extends Component{ 


    constructor(props){
        super(props)
        this.state = {
          renderComponent: false
        }
      }
   
   submitLogin = (event) =>{
       console.log('sdfghj');      
     event.preventDefault()

     this.setState ({
         renderComponent: true
     })
     
   }

   


    render(){
        console.log(this.state)
        const {renderComponent} = this.state
        return(
            <div>
         
                <form onSubmit = {this.submitLogin}>
                    <input type="text"/>
                    <button>Welcome</button>
                    
                </form>
                <Button 
                    value = 'Sign up'
                    handleChange = {this.props.handleChange}
                />
                 {
                    renderComponent ? <Redirect to='/home'/> : null 
                } 
            </div>
        )
     }
    }

export default LoginForm