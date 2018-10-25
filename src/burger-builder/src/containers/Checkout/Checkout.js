import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

   //render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.props.price} {...props} />)}/>
    render() {  
        return ( 
            <div>
                <CheckoutSummary 
                ingredients={this.props.ings} 
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients
    };
}

const mapDispatchToProps = dispatch =>{
    return{
       
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);