import request from '@/utils/request'

// 种类列表
export function type_list(query) {
  return request({
    url: '/sbgl/deviceType_listData',
    method: 'post',
    params: query
  })
}

// 添加种类
export function addtype(query) {
  return request({
    url: '/sbgl/deviceType_save',
    method: 'post',
    params: query
  })
}

// 删除种类
export function deltype(query) {
  return request({
    url: '/sbgl/deviceType_delete',
    method: 'post',
    params: query
  })
}

// 种类详情
export function parameter(query) {
  return request({
    url: '/sbgl/deviceTypeParam_listData',
    method: 'post',
    params: query
  })
}

// 添加参数
export function addparameters(query) {
  return request({
    url: '/sbgl/deviceTypeParam_save',
    method: 'post',
    params: query
  })
}

// 删除参数
export function delparameters(query) {
  return request({
    url: '/sbgl/deviceTypeParam_delete',
    method: 'post',
    params: query
  })
}

// 系统日志
export function syslog(query) {
  return request({
    url: '/sys/sysLog_listData',
    method: 'post',
    params: query
  })
}

// 系统参数列表
export function syspar(query) {
  return request({
    url: '/sys/sysParams_listData',
    method: 'post',
    params: query
  })
}

// 系统参数修改
export function sysxg(query) {
  return request({
    url: '/sys/sysParams_save',
    method: 'post',
    params: query
  })
}

// 用户管理列表
export function sysUser_listData(data) {
  return request({
    url: '/sys/sysUser_listData',
    method: 'post',
    params: data
  })
}

// 角色列表
export function sysRole_list(data) {
  return request({
    url: '/sys/sysRole_listData',
    method: 'post',
    params: data
  })
}

// 用户管理添加删除
export function sysUser_save(data) {
  return request({
    url: '/sys/sysUser_save',
    method: 'post',
    params: data
  })
}
