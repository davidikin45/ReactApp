import axios from 'axios';

const client = axios.create({
    baseURL:'https://react-my-burger-b0ffe.firebaseio.com/'
});

class Api {
	constructor(client) {
		this.client = client;
	}

	async getIngredients() {
		var response = await this.client.get('/ingredients.json');
		return response.data;
	}

	async saveOrder(payload, token) {
		var response = await this.client.post('/orders.json?auth='+token, payload);
		return response.data;
	}

	async getOrders(token, userId) {
		const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+ userId + '"';
		var response = await this.client.get('/orders.json' + queryParams);
		return response.data;
	}
}

export default new Api(client);