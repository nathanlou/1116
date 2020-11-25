import request from '@/utils/request'

//列表查询
export function companyUserListData(data) {
  return request({
    url: '/qygl/companyUser_listData',
    method: 'post',
    params:data
  })
}
//查询详情
export function companyUserGetDetail(data) {
  return request({
    url: '/qygl/companyUser_getDetail',
    method: 'post',
    params:data
  })
}
//重置密码
export function companyUserUpdateResetPd(data) {
  return request({
    url: '/qygl/companyUser_updateResetPd',
    method: 'post',
    params:data
  })
}
//新增保存
export function companyUserSave(data) {
  return request({
    url: '/qygl/companyUser_save',
    method: 'post',
    params:data
  })
}
//删除
export function companyUserDelete(data) {
  return request({
    url: '/qygl/companyUser_delete',
    method: 'post',
    params:data
  })
}
//修改密码
export function companyUserUpdateMyPassword(data) {
  return request({
    url: '/qygl/companyUser_updateMyPassword',
    method: 'post',
    params:data
  })
}