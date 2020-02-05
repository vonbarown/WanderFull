import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
const newsKey = process.env.NEWS_API_KEY

export const NewsContainer = () => {

    const [data, setData] = useState([])

    // const fetchNews = async () => {
    //     try {
    //         const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsKey}`

    //         const { data } = await axios.get(url)
    //         console.log('news', data);

    //     } catch (error) {

    //     }
    // }

    // useEffect(() => {
    //     fetchNews()
    // })

    return (
        <div>
            news
        </div>
    )
}