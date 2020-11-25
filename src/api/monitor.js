import request from '@/utils/request'

//监听接口
export function readVal(data) {
  return request({
    url: '/sbgl/deviceInfor_readVal2',
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

//修改设备参数接口
//access_token=ff711524-cb39-4417-aa54-67fc4df686d5&address1=D1005&length=2&data=1,2&deviceId=6a6857866d044b18004b
export function deviceInforSetAddessVal(data) {
  return request({
    url: '/sbgl/deviceInfor_setAddessVal',
    method: 'post',
    params:data
  })
}