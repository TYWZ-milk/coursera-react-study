import React, {Component} from 'react';
import Menu from "./MenuComponent";
import Footer from "./FooterComponent";
import Header from "./HeaderComponent";
import DishDetail from "./DishdetailComponent";
import Contact from "./ContactComponent";
import Home from "./HomeComponent";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import About from "./AboutComponent";
import {connect} from 'react-redux';

const mapStageToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders:state.leaders,
        comments:state.comments,
    }
};


class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const DishWithId = ({match}) => {
            return (
                <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}/>

            );
        };

        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        };
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                    <Route path="/menu/:dishId" component={DishWithId}/>
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
                    <Route exact path="/contactus" component={Contact}/>
                    <Redirect to="/home"/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStageToProps)(Main));
