import request from '@/utils/request'

//信息员查询
export function companyUserListBsysData(data) {
  return request({
    url: '/qygl/companyUser_listBsysData',
    method: 'post',
    params:data
  })
}
//信息员新增/修改
export function companyUserSave(data) {
  return request({
    url: '/qygl/companyUser_save',
    method: 'post',
    params:data
  })
}
//信息员查看详情
export function companyUserGetDetail(data) {
  return request({
    url: '/qygl/companyUser_getDetail',
    method: 'post',
    params:data
  })
}
//信息员充值密码
export function companyUserUpdateResetPd(data) {
  return request({
    url: '/qygl/companyUser_updateResetPd',
    method: 'post',
    params:data
  })
}
//信息员删除
export function companyUserDelete(data) {
  return request({
    url: '/qygl/companyUser_delete',
    method: 'post',
    params:data
  })
}

//下拉框查询
export function companyListCom() {
  return request({
    url: '/qygl/company_listCom',
    method: 'post',
    params:{'access_token': localStorage.getItem('accessToken')}
  })
}
