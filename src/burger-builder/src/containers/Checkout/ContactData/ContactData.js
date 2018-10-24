import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';

import api from '../../../api';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = { 
        name: '',
        email: '',
        address:{
            street:'',
            postalCode:''
        },
        loading: false
     }

    orderHandler = async (e) => {
        //Import when button is in a form
        e.preventDefault();
       this.setState({loading: true});

        const order = {
             ingredients : this.props.ingredients,
             price: this.props.price,
             customer:{
                 name:'David Ikin',
                 address:{
                     street:'1 Test St',
                     zipCode: '41351',
                     country:'Germany'
                 },
             email: 'test@test.com'
             },
             deliveryMethod: 'fastest'
         };

         try
         {
             await api.saveOrder(order);
             this.setState({loading: false});
             this.props.history.push('/');
         }
         catch(err)
         {
             this.setState({loading: false});
             console.log(err);
         }
    }

    render() { 
        let form = (
        <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);

        if(this.state.loading)
        {
            form = <Spinner />;
        }
        return ( 
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
         );
    }
}
 
export default ContactData;