import React from 'react'
import Hamburger from './Hamburger'
import '../../styles/AppNavBar.css'

const AppNavBar = (props) => {
    return (
        <div className='appNavBar'>
            <div className='appNavBarItems'>
                <h1>WanderFull</h1>
                <Hamburger />
            </div>
            {props.children}
        </div>
    )
}

export default AppNavBar