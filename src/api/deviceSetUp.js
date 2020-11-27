import request from '@/utils/request'

//监听接口
//access_token=775191bc-7ff1-4128-bc2c-459b203f3273&action=save&qylx=正常迁移&qyrq=2020-11-08&qyhqyId=6a8cb6724ad9f5a5473a&deviceId=6a8cb67255292de5499d&bz=备注
export function deviceTransferSave(data) {
  return request({
    url: '/sbgl/deviceTransfer_save',
    method: 'post',
    params:data
  })
}
//操作日志查询接口
export function deviceOpLogListData(data) {
  return request({
    url: '/sbgl/deviceOpLog_listData',
    method: 'post',
    params:data
  })
}
//批量添加设备
export function deviceInforSaveMore(data) {
  return request({
    url: '/sbgl/deviceInfor_saveMore',
    method: 'post',
    params:data
  })
}
//设备类型详情查看
export function deviceTypeGetDetail(data) {
  return request({
    url: '/sbgl/deviceType_getDetail',
    method: 'post',
    params:data
  })
}
//获取设备二维码
export function deviceInforGetEwm(data) {
  return request({
    url: '/sbgl/deviceInfor_getEwm',
    method: 'post',
    params:data
  })
}
//批量删除操作日志
export function deviceOpLogDeleteAll(data) {
  return request({
    url: '/sbgl/deviceOpLog_deleteAll',
    method: 'post',
    params:data
  })
}
