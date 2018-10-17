import React from 'react';
import FeesTable from '../components/FeesTable'
import * as actions from '../store/actions/actions';

import {connect} from 'react-redux';

class Conversion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //originAmount: '0.00',
            //originCurrency: 'USD',
            //destinationAmount: '0.00',
            //destinationCurrency: 'EUR',
            //feeAmount: 0.00,
            //conversionRate: 1.5,
            //totalCost: 0.00,
            //errorMsg: ''
        }

        // bind event listeners so 'this' will be available in the handlers
        this.handleOriginAmountChange = this.handleOriginAmountChange.bind(this);
        this.handleDestAmountChange = this.handleDestAmountChange.bind(this);
        this.handleOriginCurrencyChange = this.handleOriginCurrencyChange.bind(this);
        this.handleDestCurrencyChange = this.handleDestinationCurrencyChange.bind(this);
    }

    componentDidMount() {
        this.originAmountInput.focus();
    }
     
    handleOriginCurrencyChange(event){
        var newCurrency = event.target.value;
        this.props.dispatch(actions.changeOriginCurrency(newCurrency));

         var payload = {
                originAmount: this.props.originAmount,
                originCurrency: newCurrency,
                destCurrency: this.state.destinationCurrency,
                calcOriginAmount: false
            };

        this.props.dispatch(actions.fetchConversionRate(payload));

        var feePayload = {
            originAmount: this.props.originAmount,
            originCurrency: newCurrency,
            destCurrency: this.state.destinationCurrency
        };

        // get the new fee & total amount
        this.props.dispatch(actions.fetchFees(feePayload));
    }

    handleDestinationCurrencyChange(event){
        var newCurrency = event.target.value;
        this.props.dispatch(actions.changeDestCurrency(newCurrency));

         var payload = {
                originAmount: this.props.originAmount,
                originCurrency: this.props.originCurrency,
                destCurrency: newCurrency,
                calcOriginAmount: false
            };

        this.props.dispatch(actions.fetchConversionRate(payload));

        var feePayload = {
            originAmount: this.props.originAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: newCurrency
        };

        // get the new fee & total amount
        this.props.dispatch(actions.fetchFees(feePayload));
    }

    handleOriginAmountChange(event) {
        var newAmount = event.target.value;

        // remove unallowed chars
        newAmount = newAmount.replace(',','')

        // optimistic field updates

        //this.setState({originAmount: newAmount});
        this.props.dispatch(actions.changeOriginAmount(newAmount));  

         var payload = {
                originAmount: newAmount,
                originCurrency: this.props.originCurrency,
                destCurrency: this.props.destinationCurrency,
                calcOriginAmount: false
            };

        //calls done in parallel

        this.props.dispatch(actions.fetchConversionRate(payload));

        var feePayload = {
            originAmount: newAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: this.props.destinationCurrency
        };

        // get the new fee & total amount
        this.props.dispatch(actions.fetchFees(feePayload));
    }

    handleDestAmountChange(event) {
        var newAmount = event.target.value;

        // remove unallowed chars
        newAmount = newAmount.replace(',','')

        // optimistic field updates

        //this.setState({originAmount: newAmount});
        this.props.dispatch(actions.changeDestAmount(newAmount));  

         var payload = {
                destAmount: newAmount,
                originCurrency: this.props.originCurrency,
                destCurrency: this.props.destinationCurrency,
                calcOriginAmount: true
            };

        //calls done serially
        this.props.dispatch(actions.fetchConversionRateAndFees(payload));
    }

    render() {
        if (this.props.errorMsg) {
            var errorMsg = <div className="errorMsg">{this.props.errorMsg}</div>
        }


        return (
            <div>
                {errorMsg}
                <label>Convert</label>&nbsp;
                <input className="amount-field" ref={input => this.originAmountInput = input} onChange={this.handleOriginAmountChange} value={this.state.originAmount} />
                <select value={this.props.originCurrency} onChange={this.handleOriginCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>
                to <input className="amount-field" onChange={this.handleDestAmountChange} value={this.props.destinationAmount} />&nbsp;
                <select value={this.props.destinationCurrency} onChange={this.handleDestCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>


                <br/><br/><br/>
                <FeesTable
                    originCurrency={this.props.originCurrency}
                    destinationCurrency={this.props.destinationCurrency}
                    conversionRate={this.props.conversionRate}
                    fee={this.props.feeAmount}
                    total={this.props.totalCost}
                />
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        originCurrency: state.amount.originCurrency,
        destinationCurrency: state.amount.destinationCurrency,
        originAmount: state.amount.originAmount,
        destinationAmount: state.amount.destinationAmount,
        conversionRate: state.amount.conversionRate,
        feeAmount: state.amount.feeAmount,
        totalCost : state.amount.totalCost,
        errorMsg: state.error.errorMsg
    }
})(Conversion);