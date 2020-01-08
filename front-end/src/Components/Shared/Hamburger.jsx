import React from 'react'
import Home from '../../pages/Home'
import '../../styles/Hamburger.css'
import Profile from '../../pages/Profile'
import Settings from '../../pages/Settings'


const feedMenu = () => {
    return (
        <ul>
            <li><a href='/profile' component={Profile}> Profile </a></li>
            <li><a href='/settings' component={Settings} > Settings</a></li>
            <li><input type='text' /></li>
        </ul>
    )
}

const profileMenu = () => {
    return (
        <ul>
            <li><a href='/home' component={Home}>Feed</a></li>
            <li><a href='/settings' component={Settings}> Settings</a></li>
        </ul>
    )
}

const Hamburger = ({ feed }) => (
    <header className='hamburger'>
        <nav className='hamburger-nav'>
            <div></div>
            <div>
                {feed ? feedMenu() : profileMenu()}

            </div>
        </nav>
    </header>

)


export default Hamburger