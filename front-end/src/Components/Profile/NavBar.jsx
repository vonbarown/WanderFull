import React from 'react'
// import NavItems from './NavItems'
import MapContainer from '../Map/MapOfficial'

const NavBar = (props) => {
    return (<div className='navItems'>

        <button>Travel</button>
        <button>{<a href="/map">Buds</a>}</button>
        <button>WishList</button>
        <button>{<a href="/buds">Buds</a>}</button>
    </div>

    )
}
export default NavBar