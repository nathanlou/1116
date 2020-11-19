import request from '@/utils/request'

//列表查询
export function deviceTransferListData(data) {
  return request({
    url: '/sbgl/deviceTransfer_listData',
    method: 'post',
    params:data
  })
}

//添加
export function deviceTransferSave(data) {
  return request({
    url: '/sbgl/deviceTransfer_save',
    method: 'post',
    params:data
  })
}

//查看详情
export function deviceTransferGetDetail(data) {
  return request({
    url: '/sbgl/deviceTransfer_getDetail',
    method: 'post',
    params:data
  })
}
//删除
export function deviceTransferDelete(data) {
  return request({
    url: '/sbgl/deviceTransfer_delete',
    method: 'post',
    params:data
  })
}