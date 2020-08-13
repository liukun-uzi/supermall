import axios from 'axios'

export function request(option) {
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL: 'xxxxxxxxxxxxxxxxxx',
      timeout: 5000
    })

    //2.axios拦截器
    axios.interceptors.request.use(config => {
    return config
    },err => err)
    //响应拦截xx
    instance.interceptors.response.use(res => {
      return res.data
    },err => {
      console.log(err);
    })
		// 3.传入对象进行网络请求
    instance(option).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
 
}
