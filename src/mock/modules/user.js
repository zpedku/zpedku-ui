export function userInfo() {
  const userInfo = {
    "code": 200,
    "msg": null,
    "data": {
      "id": null,
      "name": "zpedku",
      "userId": 1,
      "token": "77ae89be36504adfb5c09ef71409ea0e",
      "expireTime": "2018-09-01T16:24:50.473+0000",
      "createBy": null,
      "createTime": null,
      "lastUpdateBy": null,
      "lastUpdateTime": "2018-09-01T04:24:50.473+0000"
    }
  }
  return {
    url: 'user/info',
    type: 'get',
    data: userInfo
  }
}


// 查找用户的菜单权限标识集合
export function findPermissions() {
  let permsData = {
    "code": 200,
    "msg": null,
    "data": [
      null,
      "sys:user:view",
      "sys:menu:delete",
      "sys:dept:edit",
      "sys:dict:edit",
      "sys:dict:delete",
      "sys:menu:add",
      "sys:user:add",
      "sys:log:view",
      "sys:dept:delete",
      "sys:role:edit",
      "sys:role:view",
      "sys:dict:view",
      "sys:user:edit",
      "sys:user:delete",
      "sys:dept:view",
      "sys:dept:add",
      "sys:role:delete",
      "sys:menu:view",
      "sys:menu:edit",
      "sys:dict:add",
      "sys:role:add"
    ]
  }
  return {
    url: 'user/findPermissions',
    type: 'get',
    data: permsData
  }
}
