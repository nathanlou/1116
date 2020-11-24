import request from '@/utils/request'

export function indexdata(data) {
  return request({
    url: '/index/index_statData',
    method: 'post',
    params: data
  })
}
