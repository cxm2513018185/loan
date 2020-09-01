// -----------------请求拦截封装---------------
import axios from 'axios';
import { getToken } from "@/utils/token";
import { Message } from 'element-ui'

axios.defaults.baseURL = 'http://139.196.42.209:5004/api/';

// 请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求前
    // console.log(config);
    if (config.url != "user/login") {
        config.headers['token'] = getToken();
    }
    return config;
}, err => {
    // 请求错误
    return Promise.reject(err);
})

// 响应拦截器
axios.interceptors.response.use(res => {
    // 响应数据
    if (res.data.code != 20000) {
        if (res.data.code == 10001) {
            Message({
                message: 'token不存在或已过期，请重新登录',
                type: 'warning',
                duration: 2000
            });
        } else {
            Message({
                message: res.data.data.message,
                type: 'warning',
                duration: 2000
            });
        }
    }
    return res;
}, err => {
    // 响应数据错误
    Message({
        showClose: true,
        message: err.message,
        type: 'error'
    });
    return Promise.reject(err);
})

export default axios;