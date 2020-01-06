import React, { Component } from 'react'

class imgCarousel extends Component {
    constructor(){
    super()
    this.initialState = {
        index: 0,
        array: ["http://packages.world-avenues.com/wp-content/uploads/2017/10/nightlife-singapore.jpg.jpg", 
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1200px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg",
                "http://rmafoodjourney.weebly.com/uploads/5/2/1/5/52157521/1175557_orig.jpg",
                "https://d36tnp772eyphs.cloudfront.net/blogs/1/2019/08/Venezuelan-arepas.jpg"]
    }
    this.state = this.initialState
}

    componentDidMount(){
    this.interval = setInterval(() => {
      const {array, index} = this.state
      const newIndex = (index + 1) % (array.length)
      this.setState({
          index: newIndex
      })
    }, 3000);
}

componentWillUnmount(){
    clearInterval(this.interval)
}

    render() {
        return(
            <div>
               <img alt='carousel' src={this.state.array[this.state.index]}/>
            </div>
        )
    }
}
    


export default imgCarousel