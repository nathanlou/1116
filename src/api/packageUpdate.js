import request from '@/utils/request'

//升级包管理列表查询
export function deviceVersionListData(data) {
  return request({
    url: '/sbgl/deviceVersion_listData',
    method: 'post',
    params:data
  })
}
//升级包管理新增/修改
export function deviceVersionSave(data) {
  return request({
    url: '/sbgl/deviceVersion_save',
    method: 'post',
    params:data
  })
}
//查看详情
export function deviceVersionGetDetail(data) {
  return request({
    url: '/sbgl/deviceVersion_getDetail',
    method: 'post',
    params:data
  })
}
//企业升级包-下载
export function deviceVersionDownload(data) {
  return request({
    url: '/sbgl/deviceVersion_download',
    method:'get',
    params:data
  })
}
//删除
export function deviceVersionDelete(data) {
  return request({
    url: '/sbgl/deviceVersion_delete',
    method: 'post',
    params:data
  })
}

//企业升级包-根据类型查询型号列表
export function deviceVersionGetModel(data) {
  return request({
    url: '/sbgl/deviceVersion_getModel',
    method: 'post',
    params:data
  })
}
