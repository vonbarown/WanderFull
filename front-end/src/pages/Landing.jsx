import React,{ Component } from 'react'
import Container from '../Components/Landing/Container'


class Landing extends Component {
    state = {
        firstRender: true,
        login: false
    }

handleChange = (event) =>{
    const {firstRender} = this.state
    if (firstRender) {
        this.switchFirstRender()
    }

    if(event.target.value === 'Login'){
        this.setState({
            login: true
        })
    } else {
        this.setState({
            login: false
        })
    }
}

switchFirstRender = () => {
    this.setState({
        firstRender: false 
    })
}

    render() {
        const {firstRender, login, signUp} = this.state
        const {handleChange} = this
        return (
            <div>
                <h1>Landing</h1>
                <Container 
                    handleChange = {handleChange}
                    firstRender = {firstRender}
                    login={login}
                    signUp = {signUp}
                />
            </div>
        )
    }
}

export default Landing