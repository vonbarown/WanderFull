import React,{ Component } from 'react'

class Landing extends Component {
    state = {
        firstRender: true,
        login: false,
        signUp: false
    }

    render() {
        return (
            <div>Landing</div>
        )
    }
}

export default Landing;