import React from 'react'
import Button from '../Shared/Button'
import LoginForm from './Login/LoginForm'
import SignUpForm from './SignUp/SignUpForm'


const Container = ({firstRender, login, handleChange}) => (
    !firstRender && login 
    ? <LoginForm handleChange = {handleChange}/> 
    : !firstRender && !login 
    ? <SignUpForm handleChange = {handleChange}/> 
    : ( <div>
            <Button 
                value='Login' 
                handleChange = {handleChange}
            />

            <Button 
                value ='Sign up' 
                handleChange = {handleChange}
            />

        </div>)
)

export default Container