import React from "react";
import Card from "react-bootstrap/Card";

function NewsItem(props) {
    return (
        <Card>
            <Card.Img variant="top" 
                src={ props.article.urlToImage !== null ? props.article.urlToImage : 'https://via.placeholder.com/150'} 
                alt={props.article.source.name} 
            />
            <Card.Body>
                <Card.Title>{ props.article.title }</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">Source: { props.article.source.name }</Card.Subtitle>
                <Card.Text>
                    { props.article.description }
                </Card.Text>
                <Card.Link href={props.article.url}>Read more</Card.Link>
            </Card.Body>
            <Card.Footer>
                <small class="text-muted"><strong>Published:</strong> { props.article.publishedAt }</small>
            </Card.Footer>
        </Card>
    );
}

export default NewsItem;