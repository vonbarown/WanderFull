import React, { Component } from 'react'
import axios from 'axios'


class Quote extends Component {
    constructor() {
        super()
        this.state = {
            index: 0,
            quotesArr: '',
            quote: ''
        }
    }


    async componentDidMount() {
        await this.fetchQuote()

    }

    getQuote = () => {
        let t = this.state.quotesArr[this.state.index]
        this.setState({
            quote: this.state.quotesArr[this.state.index]
        })
    }


    getRandomNum = () => {

        this.setState({
            index: Math.floor((Math.random() * this.state.quotesArr.length) + 0)
        })
        this.getQuote()
    }

    async fetchQuote() {
        try {
            const { data } = await axios.get('https://type.fit/api/quotes')
            this.setState({
                quotesArr: data
            })
        } catch (error) {

        }

        this.getRandomNum()
    }

    render() {
        const { quote } = this.state

        return (
            <div className={'quote'}>
                <div className='quoteBody'>
                    <i>"{quote.text}"</i>
                    <br></br>
                    <i>{`-${quote.author}`}</i>
                </div>
            </div>
        )
    }


}

export default Quote