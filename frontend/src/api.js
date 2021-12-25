import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

const instance = axios.create({
	baseUrl: 'http://localhost:8000',
	headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
});

instance.interceptors.request.use(
	function (config) {
		console.log('intercepted');
		config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

export default instance;
