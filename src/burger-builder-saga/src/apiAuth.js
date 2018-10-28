import axios from 'axios';

const client = axios.create({
    baseURL:'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
});

client.interceptors.request.use((req) => {
    req.params = {
        ...req.params,
        key: 'AIzaSyA2LePmoEkoGlWltyk8Rlia0Y-49_U1V4A'
    };
    return req
})

class ApiAuth {
	constructor(client) {
		this.client = client;
	}

	async signup(email, password) {
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		var response = await this.client.post('/signupNewUser', authData);
		return response.data;
	}

	async signin(email, password) {
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		var response = await this.client.post('/verifyPassword', authData);
		return response.data;
	}
}

export default new ApiAuth(client);