import React, {Component} from 'react'
import Button from '../Button'

class SignUpForm extends Component{ 
constructor (props){
    super(props)
}
    submitSignUp = (event) =>{
        event.preventDefault()
        console.log('ok')
    }
        render(){
            const {submitSignUp} = this
            return(
                <div>
                <form onSubmit = {submitSignUp}>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <Button 
                    value = 'Welcome'/>
                </form>
                <Button 
                value = 'Login'
                handleChange = {this.props.handleChange}
                />
                </div>
            )
        }
        }
    
export default SignUpForm