/**
 * axios setting
 */

import axios from 'axios'

const target = process.env.API_TARGET || 'http://localhost:3001/'


// Add a request interceptor
axios.interceptors.request.use(function (config) {

    //타겟설정
    config.url = target + (config.url.startsWith('/')?config.url.replace('/', ''):config.url)
    
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default axios