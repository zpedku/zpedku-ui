import {baseUrl} from '@/utils/global'

export default {
  method: 'get',
  baseUrl: baseUrl,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  //参数
  data: {},
  //设置超时时间
  timeout: 10000,
  withCredentials: true,
  //返回数据类型
  responseType: 'json'
}
