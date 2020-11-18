import request from '@/utils/request'

export function login(data) {
	console.log(data)
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
    params:  {token}
  })
}



export function logout(token) {
  return request({
    url: '/oauth/loginOut',
    method: 'post',
	params: {'access_token': localStorage.getItem('accessToken')}
  })
}
