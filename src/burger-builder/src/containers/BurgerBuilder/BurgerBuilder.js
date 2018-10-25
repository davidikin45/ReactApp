import React, { Component } from 'react';
import { connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Wrap from '../../hoc/Wrap'
import Modal from '../../components/UI/Modal/Modal'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import * as actions from '../../store/state/actions';

import api from '../../api';

class BurgerBuilder extends Component {

    //UI state
    state = {  
        purchasing: false,
        loading: false,
        error: false
    }

    async componentDidMount(){
        // try{
        //     var data = await api.getIngredients();
        //     this.setState({ingredients: data});
        // }
        // catch(err)
        // {
        //     this.setState({error: true});
        // }
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey];
            }).reduce((sum, el) =>{
                return sum + el;
            },0);
       return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = async () => {
        this.props.history.push('/checkout');
    }
 
    render() { 
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key] =  disabledInfo[key] <= 0; 
        }
        let orderSummary = null;
        let burger= this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if(this.props.ings)
        {
             burger =(
             <Wrap>
        
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                ingredientAdded={this.props.onIngredientAdded} 
                ingredientRemoved={this.props.onIngredientRemoved} 
                disabled={disabledInfo} 
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                price={this.props.price}/>
            </Wrap>);

            orderSummary = <OrderSummary 
                ingredients={this.props.ings} 
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                 />;
        }
        if(this.state.loading)
        {
            orderSummary = <Spinner/>;
        }
        return ( 
            <Wrap>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Wrap>
         );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, api.client));