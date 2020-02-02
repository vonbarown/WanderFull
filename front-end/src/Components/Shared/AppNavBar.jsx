import React from 'react'
import Hamburger from './Hamburger'
import '../../styles/AppNavBar.css'
import logo from '../../themes/Logo/f537d019-e1b6-4e42-8275-2c9c5c7b8075_200x200.png'

const AppNavBar = (props) => {
    return (
        <div className='appNavBar'>
            <div className='appNavBarItems'>
                <div className='logo'>
                    <a href="/home"><img src={logo} alt='logo' /></a>
                </div>
                <Hamburger />
            </div>
            {props.children}
        </div>
    )
}

export default AppNavBar