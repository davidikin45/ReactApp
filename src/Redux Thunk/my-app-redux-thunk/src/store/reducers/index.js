import { combineReducers } from 'redux';
import amount from './amount'
import error from './error'

export default combineReducers({
    amount: amount,
    error: error
})

//When using combineReducers must reference the reducer in the MapStateToProperties funtion
// export default connect((state, props) => {
//     return {
//         originAmount: state.amount.originAmount,
//         destinationAmount: state.amount.destinationAmount,
//         conversionRate: state.amount.conversionRate,
//         feeAmount: state.amount.feeAmount,
//         totalCost : state.amount.totalCost
//     }
// })(Conversion);