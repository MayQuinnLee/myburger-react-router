import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     //change componentDidMount to componentWillMount. if not null will be passed into this.state.ingredients in ContactData. This will make sure that we already have access to the props(queryParams) before we render the child component
    //     price:0,
    // }

    // componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients ={};
    //     let price = 0;
    //     console.log(this.props)
    //     for (let param of query.entries()){
    //         //this will return ['salad','1']
    //         if(param[0]==='price'){
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]]=+param[1];
    //         } //ingredients[bacon]=1
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price})
    // };

    checkoutCancelledHandler = () => (
        this.props.history.goBack()
    );

    checkoutContinueHandler = () => (
        this.props.history.push('checkout/contact-data')
    );


    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelledHandler} 
                checkoutContinue={this.checkoutContinueHandler}
                />
                <Route path={this.props.match.url + '/contact-data'} component={ContactData} />

                {/* render={(props)=> (<ContactData 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        {...props}/>)}/>
                as a function and take jsx on the right side 
                Since we are handling it manually through render, we can now pass props*/}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalP: state.totalPrice
    }
}

export default connect(mapStateToProps, null)(Checkout);