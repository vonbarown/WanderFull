import React from 'react'
import Hamburger from './Hamburger'

const AppNavBar = (props) => {
    return (
        <div className='appNavBar'>
            <div className='top'>
                <h1>WanderFull</h1>
                <Hamburger />
            </div>
            {props.children}
        </div>
    )
}

export default AppNavBar