import React from 'react';
import {Card, CardImg, CardText, CardTitle, CardBody, BreadcrumbItem, Breadcrumb} from "reactstrap";
import {Link} from "react-router-dom";


function RenderComments({comments}) {
    let commentView;
    if (comments == null) {
        commentView = <div></div>;
    } else {
        commentView = comments.map((comment) => {
            return (
                <ul className="list-unstyled">
                    <li>{comment.comment}</li>
                    <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(Date.parse(comment.date)))}</li>
                </ul>);
        });
    }
    return (
        <div>
            <h4>Comment</h4>
            {commentView}
        </div>
    );
}

function RenderDish({dish}) {
    if (dish != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

const DishDetail = (props)=> {
    const dishDetail = <RenderDish dish={props.dish}/>;
    let comments;
    if (props.dish != null) {
        comments = <RenderComments comments={props.comments}/>;
    }

    return (
        <div className="container">
            <div className="row" >
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/menu' >Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {props.dish.name}
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3> {props.dish.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                {dishDetail}
                <div className="col-12 col-md-5 m-1">
                    {comments}
                </div>
            </div>
        </div>
    );
}


export default DishDetail