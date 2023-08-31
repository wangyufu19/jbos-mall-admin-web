import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '../router'
import { getToken } from '@/utils/global'
import qs from 'qs'
import merge from 'lodash/merge'

// create an axios instance
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// request interceptor
http.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['accessToken'] = getToken()
      config.headers['timestamp'] = new Date().getTime()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Message({
      message: '服务器请求异常，请联系管理员!',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// response interceptor
http.interceptors.response.use(
  response => {
    const res = response.data
    if (res.retCode !==undefined&&res.retCode !== '0000') {
      Message({
        message: res.retMsg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(res.retMsg || 'Error'))
    } else {
      return response
    }
  },
  error => {
    alert(error.response.status)
    if(error.response.status===401){
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    }
    Message({
      message: '服务器响应异常，请联系管理员!',
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)
/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}
export default http

export function get(url,params) {
  return new Promise((resolve,reject)=>{
    http.get(url,{
      params:params
    }).then((res)=>{
      resolve(res.data)
    }).catch((error)=>{
      reject(error.data)
    })
  })
}
