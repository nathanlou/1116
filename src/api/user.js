import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/oauth/token',
    method: 'post',
    params: data
  })
}

export function getInfo(token) {
  console.log(token)
  return request({
    url: '/oauth/getSessionUser',
    method: 'post',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/oauth/logout',
    method: 'post',
    params: { 'access_token': localStorage.getItem('accessToken') }
  })
}

export function QueryUserRole(token) {
  return request({
    url: '/sys/sysPower_getUserModules',
    method: 'post',
    params: { 'access_token': localStorage.getItem('accessToken') }
  })
}
export function refresh_token(data) {
  return request({
    url: '/oauth/token',
    method: 'post',
    params: data
  })
}
