import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import CardDeck from 'react-bootstrap/CardDeck'
import NewsItem from "./NewsItem";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const API_URL = process.env.REACT_APP_NEWS_API_URL + 'top-headlines?country=us&apiKey=' + API_KEY;

function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNews = () => {
        setLoading(true);
        setNews([]);

        fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const topThreeHeadlines = data.articles.slice(0, 3);
            setNews([...topThreeHeadlines]);
        }).finally(() => {
            setLoading(false);
        })
        // .catch(err => console.log(err));
    }

    // Similar to componentDidMount and componentDidUpdate in Class based components:
    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <>
            <h1>Home</h1>
            <p className="lead">A quick example of using ReactJS to fetch Top Headlines from <a href="https://newsapi.org">NewsAPI</a>.</p>
            { loading && 
                <div className="loading-spinner d-flex align-items-center justify-content-center"> 
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            }

            { (news.length > 0) && 
                <CardDeck>
                    { news.map((item, index) => <NewsItem key={index} article={item} />) }
                </CardDeck>
            }
        </>
    )
}

export default Home;