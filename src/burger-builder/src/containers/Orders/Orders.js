import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import api from '../../api';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = { 
        orders:[],
        loading: true
     }
    async componentDidMount(){
        try
        {
            var orders = await api.getOrders();
            const fetchedOrders=[];
            for (let key in orders)
            {
                fetchedOrders.push({
                    ...orders[key],
                    id: key
                });
            }

            this.setState({loading: false, orders: fetchedOrders});
        }
        catch(err)
        {
            this.setState({loading: false});
        }
    }

    render() { 
        return ( 
            <div>
                {this.state.orders.map(order=>(<Order key={order.id} ingredients={order.ingredients} price={order.price} />))}
            </div>
         );
    }
}
 
export default withErrorHandler(Orders, api.client);