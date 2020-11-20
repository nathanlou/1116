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
