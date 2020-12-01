import request from '@/utils/request'

export function getUUid(data) {
  return request({
    url: '/common/getUUid',
    method: 'post',
    params: data
  })
}
//新增图片
export function commonLogUpload(data) {
  return request({
    url: '/common/commonLog_upload',
    method: 'post',
    params: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
//删除图片
export function commonFileDelete(data) {
  return request({
    url: '/common/commonFile_delete',
    method: 'post',
    params: data
  })
}
