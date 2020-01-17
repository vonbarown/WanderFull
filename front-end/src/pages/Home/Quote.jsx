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
        // this.getRandomNum()
        // this.setState({
        //     quote: this.state.quotesArr[this.state.index]
        // })
        // await this.getQuote()
    }

    getQuote = () => {
        let t = this.state.quotesArr[this.state.index]
        console.log(t);
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
            console.log('data', data);


            this.setState({
                quotesArr: data
            })
        } catch (error) {

        }

        this.getRandomNum()
    }

    render() {
        console.log(this.state);
        const { quote } = this.state

        return (
            <div className={'quote'}>
                <div className='quoteBody'>
                    <p>{quote.text}</p>
                    <p>{`By: ${quote.author}`}</p>
                </div>
            </div>
        )
    }


}

export default Quote