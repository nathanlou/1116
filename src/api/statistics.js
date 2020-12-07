import request from '@/utils/request'

export function tjfxGetFltj(data) {
  return request({
    url: '/tjfx/tjfx_getFltj',
    method: 'post',
    params: data
  })
}
export function tjfxGetCompanyCurve(data) {
  return request({
    url: '/tjfx/tjfx_getCompanyCurve',
    method: 'post',
    params: data
  })
}
