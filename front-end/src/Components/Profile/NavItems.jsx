import React, { Component } from 'react'
import Button from '../Shared/Button'

class NavBtns extends Component {
    render() {
        return (<div className='navBtn'>
            <Button
                value='Travel'
            />

            <Button
                value='Location'
            />

            <Button
                value='Wishlist'
            />

            <Button
                value='Buds'
            />
        </div>)
    }
}

export default NavBtns