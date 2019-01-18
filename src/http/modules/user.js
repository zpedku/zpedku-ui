import axios from '../axios'

/*
* 用户管理模块
*/

export const userInfo = (data) => {
  return axios({
    url: '/user/info',
    method: 'get',
    data
  })
}

// 保存
export const save = (data) => {
  return axios({
    url: '/user/save',
    method: 'post',
    data
  })
}

//删除
export const batchDelete = (data) => {
  return axios({
    url: '/user/delete',
    method: 'post',
    data
  })
}

//分页组件
export const findPage = (data) => {
  return axios({
    url: '/user/findPage',
    method: 'post',
    data
  })
}

//查询用户菜单权限标识集合
export const findPermissions = (params) => {
  return axios({
    url: '/user/findPermissions',
    method: 'get',
    params
  })
}
