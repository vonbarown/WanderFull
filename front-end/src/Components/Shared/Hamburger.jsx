import React from 'react'
// import Home from '../../pages/Home'
import '../../styles/Hamburger.css'


const feedMenu = () => {
  return  (
        <ul>
            <li><a href='/profile'> Profile </a></li>
            <li><a href='/settings'> Settings</a></li>
            <li><input type = 'text'/></li>
        </ul>
     
        
        
)
}



const profileMenu = () => {
    return (
    <ul>
        <li><a href = '/home'>Feed</a></li>
        <li><a href = '/settings'> Settings</a></li>
    </ul>
)} 

const Hamburger = ({ feed }) => (
    <header className = 'hamburger'>
        <nav className = 'hamburger-nav'>
            <div></div>
            <div>
                {feed ? feedMenu() : profileMenu() }

            </div>
        </nav>
    </header>

)


export default Hamburger