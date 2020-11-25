import request from '@/utils/request'

//企业管理列表
export function company_list(data) {
  return request({
    url: '/qygl/company_listData',
    method: 'post',
    params: data
  })
}

//修改或保存
export function company_save(data) {
  return request({
    url: '/qygl/company_save',
    method: 'post',
    params: data
  })
}

//删除企业
export function company_delete(data) {
  return request({
    url: '/qygl/company_delete',
    method: 'post',
    params: data
  })
}
