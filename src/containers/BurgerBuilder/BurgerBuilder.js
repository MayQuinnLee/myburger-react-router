import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount () {
        console.log(this.props);
        //Since BurgerBuilder is part of the routable area, we have access to the match, location, history props
        // axios.get("https://myburger-react-64ebe.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {this.setState({error: true})})
    }

    updatePurchaseState () {
        const sum = Object.keys(this.props.ings)
            .map( igKey => {
                return this.props.ings[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }
        //this is only passing into the URL

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key]= disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}

        let orderSummary = null;


        let burger = this.state.error ? <p> Ingredients can't be loaded </p> : <Spinner />

        if(this.props.ings){
            burger = (
              <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                  ingredientAdded={this.props.onAddIngredient}
                  ingredientRemoved={this.props.onRemoveIngredient}
                  disabled={disabledInfo}
                  purchasable={this.updatePurchaseState()}
                  ordered={this.purchaseHandler}
                  price={this.props.totalP}
                />
              </Aux>
            );
            orderSummary = (<OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.totalP}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}              
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalP: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingType) => dispatch({type: actionTypes.ADD_ING, ingType: ingType}),
        onRemoveIngredient: (ingType) => dispatch({type: actionTypes.REMOVE_ING, ingType: ingType}),
        onUpdatePurchase: (ingType) => dispatch({type: actionTypes.UPDATE_PURCHASE, ingType: ingType}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));