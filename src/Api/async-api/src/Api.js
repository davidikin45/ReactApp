/**
 * @ The external dependencies.
 */
import axios from 'axios';

/**
 * @ Setup api config.
 */
const client = axios.create({
	baseURL: 'https://api.coinmarketcap.com/v1',
});

/**
 * Class for api.
 *
 * @class Api (name)
 */
class Api {
	constructor(client) {
		this.client = client;
	}

	async getDataAsync() {
		var response = await this.client.get('/ticker/?limit=10');
		return response.data;
	}

	getData() {
		return this.client
			.get('/ticker/?limit=10')
			.then(response => response.data);
	}
}

export default new Api(client);