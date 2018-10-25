# Getting Started with React Forms

## Form Component Form with 2-way data binding
```
import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import api from '../../../api';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = { 
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value: '',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
     }

    orderHandler = async (e) => {
        //Import when button is in a form
        e.preventDefault();
       this.setState({loading: true});
       const formData = {};
       for (let formElementIdentifier in this.state.orderForm) {
           formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
       }

        const order = {
             ingredients : this.props.ingredients,
             price: this.props.price,
             orderData: formData
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

    checkValidity(value, rules) {
        let isValid = true;
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() { 
        const formElementsArray =[];
        for (let key in this.state.orderForm)
        {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
        <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement =>(
            <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />))}
            <Button 
            btnType="Success"
            disabled={!this.state.formIsValid}>ORDER</Button>
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
```

## Input Component Input
1. Input.js
```
import React from 'react';

import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null;

    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType)
    {
        case('input'):
            inputElement = <input 
            className={inputClasses.join(' ')}
            {...props.elementConfig} 
            onChange={props.changed}
            value={props.value} />;
            break;
        case('textarea'):
            inputElement = <textarea 
            className={inputClasses.join(' ')}
            {...props.elementConfig} 
            onChange={props.changed}
            value={props.value}/>;
            break;
        case('select'):
            inputElement =(
            <select 
            className={inputClasses.join(' ')}
            onChange={props.changed}
            value={props.value}>
                {props.elementConfig.options.map(option => (
                   <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>);
            break;
        default:
            inputElement = <input 
            className={inputClasses.join(' ')}
            onChange={props.changed}
            {...props.elementConfig} 
            value={props.value}/>;
    }

    return ( 
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
     );
}
 
export default input;
```
2. Input.module.css
```
.Input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}

.Label {
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
}

.InputElement {
    outline: none;
    border: 1px solid #ccc;
    background-color: white;
    font: inherit;
    padding: 6px 10px;
    display: block;
    width: 100%;
    box-sizing: border-box;
}

.InputElement:focus {
    outline: none;
    background-color: #ccc;
}

.Invalid {
    border: 1px solid red;
    background-color: #FDA49A;
}
```

## Authors

* **David Ikin**