import request from '@/utils/request'

export function indexdata(data) {
  return request({
    url: '/index/index_statData',
    method: 'post',
    params: data
  })
}

// 首页地图
export function statMap(data) {
  return request({
    url: '/index/index_statMapData',
    method: 'post',
    params: data
  })
}
