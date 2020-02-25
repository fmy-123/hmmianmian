import axios from "axios"

import {getToken} from '@/utilis/token.js'

let indexRequest=axios.create({
    baseURL: process.env.VUE_APP_URL,
   
})
//请求拦截
indexRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token=getToken();
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
//获取用户信息请求
export function info(){
    return indexRequest({
        url:'/info',
        method:'get'
    })
}
export function logout(){
    return indexRequest({
        url:'/logout',
        method:'get'
    })
}