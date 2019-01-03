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


