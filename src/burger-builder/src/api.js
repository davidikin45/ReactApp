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

	async saveOrder(payload) {
		var response = await this.client.post('/orders.json', payload);
		return response.data;
	}
}

export default new Api(client);