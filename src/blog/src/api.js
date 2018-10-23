import axios from 'axios';

const api = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
});

api.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

api.interceptors.request.use(request =>{
    //Edit request config
    return request;
}, error =>{
    console.log(error);
    return Promise.reject(error);
})

api.interceptors.request.use(response =>{
    //Edit request config
    return response;
}, error =>{
    //sending error
    console.log(error);
    return Promise.reject(error);
})

export default api;