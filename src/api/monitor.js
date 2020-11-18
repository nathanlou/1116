import request from '@/utils/request'

//监听接口
export function readVal(data) {
  return request({
    url: '/sbgl/deviceInfor_readVal',
    method: 'post',
    params:data
  })
}

//根据设备类型ID获取设备参数接口
export function getDetailsByDeviceTypeId(data) {
  return request({
    url: '/sbgl/deviceTypeParam_listData',
    method: 'post',
    params:data
  })
}
