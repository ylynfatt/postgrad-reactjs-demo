import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import CardColumns from 'react-bootstrap/CardColumns';
import NewsItem from "./NewsItem";

const API_URL = process.env.REACT_APP_NEWS_API_URL + 'everything?apikey=' + process.env.REACT_APP_NEWS_API_KEY

function Search() {
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (search.length > 3) {
            setLoading(true);

            fetch(API_URL + '&q=' + search + '&sortBy=popularity')
            .then((response) => response.json())
            .then((data) => {
                setNews([...data.articles])
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    return (
        <>
            <h1>Search</h1>
            <p className="lead">An example of using ReactJS to search for articles on a particular topic from <a href="https://newsapi.org">NewsAPI</a>.</p>
            <Form onSubmit={handleSubmit} inline>
                <FormControl type="text" id="search" name="search" value={search} onChange={handleChange} placeholder="Enter your Search term" className="mr-sm-2" />
                <Button type="submit" variant="outline-success">Search</Button>
            </Form>
            <div id="results" className="mt-4">
                { loading &&
                    <div className="loading-spinner d-flex align-items-center justify-content-center"> 
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                }
                { !loading &&
                    <CardColumns>
                        { news.map((item, index) => <NewsItem key={index} article={item} />) }
                    </CardColumns>
                }
            </div>
        </>
    )
}

export default Search;