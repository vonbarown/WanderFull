import React, {Component} from 'react'
import Button from '../../Shared/Button'

class SignUpForm extends Component{ 
        render(){
            const {submitSignUp} = this
            return(
                <div>
                <form onSubmit = {submitSignUp}>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <Button value = 'Welcome'
                    
                    />
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