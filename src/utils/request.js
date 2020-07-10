import axios from "axios";
import {
    Message
} from 'element-ui'
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/api/', // api的base_ur
    timeout: 15000, // 请求超时时间
    withCredentials: true,
})

// 请求前拦截
service.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            let  token =localStorage.getItem('token') ;
            config.headers['Authorization'] = token
        }
        return config;
    },
    err => {
        console.log("请求超时");
        return Promise.reject(err);
    }
);

// 返回后拦截
service.interceptors.response.use(
    data => {
        if (data.data.code == '200') {
            return data.data;
        } else {
            Message({
                message: data.data.msg||'请求失败',
                type: 'error',
                duration: 2 * 1000
            })
            return Promise.reject(data.data);
        }

    },
    err => {
        console.log(err)
        return Promise.reject(err);
    }
);
export default service;