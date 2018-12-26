import axios from '../axios'


export const userInfo = (data) => {
  return axios({
    url: '/user/info',
    method: 'get',
    data
  })
}
