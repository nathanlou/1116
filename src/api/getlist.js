import request from '@/utils/request'
import { getToken, setToken, removeToken } from '@/utils/auth'

//设备列表
export function equipment_list(data) {
  return request({
    url: '/sbgl/deviceInfor_listData',
    method: 'post',
	params:data
  })
}

//设备详情
export function equipment_msg(data) {
  return request({
    url: '/sbgl/deviceInfor_getDetail',
    method: 'post',
	params:data
  })
}

//企业列表
export function company_listData(data) {
  return request({
    url: '/qygl/company_listData',
    method: 'post',
	params:data
  })
}

//添加修改设备
export function equipment_add(data) {
  return request({
    url: '/sbgl/deviceInfor_save',
    method: 'post',
	params:data
  })
}

//删除设备
export function equipment_del(data) {
  return request({
    url: '/sbgl/deviceInfor_delete',
    method: 'post',
	params:data
  })
}

//报警列表
export function alarm(data) {
  return request({
    url: '/sbgl/deviceAlarm_listData',
    method: 'post',
	params:data
  })
}

//报警分类列表
export function alarmtype(data) {
  return request({
    url: '/sbgl/deviceAlarmType_listData',
    method: 'post',
	params:data
  })
}