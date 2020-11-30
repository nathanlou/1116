import request from '@/utils/request'

export function indexdata(data) {
  return request({
    url: '/index/index_statData',
    method: 'post',
    params: data
  })
}

// 首页地图
export function statMap(data) {
  return request({
    url: '/index/index_statMapData',
    method: 'post',
    params: data
  })
}

// 获取用户信息
export function getSessionUser(data) {
  return request({
    url: '/oauth/getSessionUser',
    method: 'post',
    params: data
  })
}

// 用户自己修改秘密
export function updatepassword(data) {
  return request({
    url: '/sys/sysUser_updateMyPassword',
    method: 'post',
    params: data
  })
}
