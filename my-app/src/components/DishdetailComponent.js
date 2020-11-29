import React, {Component} from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardTitle,
    CardBody,
    BreadcrumbItem,
    Breadcrumb,
    Button,
    Modal,
    ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col,
} from "reactstrap";
import {Link} from "react-router-dom";
import {Control, Errors, LocalForm} from "react-redux-form";
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseUrl";

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderComments({comments, postComment, dishId}) {
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
            <CommentForm dishId={dishId} postComment={postComment}/>
        </div>
    );
}

function RenderDish({dish}) {
    if (dish != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
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

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    const dishDetail = <RenderDish dish={props.dish}/>;
    let comments;
    if (props.dish != null) {
        comments = <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/>;
    }


    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/menu'>Menu</Link>
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
};

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
        this.toggleModel = this.toggleModel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModel() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        })
    }


    handleSubmit(values) {
        this.toggleModel();
        alert("Current state is: " + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggleModel}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModel}>
                    <ModalHeader toggle={this.toggleModel}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                            <Label htmlFor="rating" md={10}>Rating</Label>
                            <Col md={10}>
                                <Control.select model=".rating" id="rating" name="rating"
                                                className="form-control"
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </Col>
                            <Label htmlFor="author" md={10}>Your Name</Label>
                            <Col md={10}>
                                <Control.text model=".author" id="author" name="author"
                                              placeholder="Your Name"
                                              className="form-control"
                                              validators={{
                                                  minLength: minLength(3), maxLength: maxLength(15)
                                              }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                            <Label htmlFor="comment" md={10}>
                                Comment
                            </Label>
                            <Col md={10}>
                                <Control.textarea model=".comment" id="comment" name="comment" rows="6"
                                                  className="form-control"/>
                            </Col>
                            <Col md={{size: 10}} className="mt-3">
                                <Button type="submit" color="primary">Submit</Button>
                            </Col>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}


export default DishDetail