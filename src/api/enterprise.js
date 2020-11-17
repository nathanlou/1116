import request from '@/utils/request'

//企业管理列表
export function company_list(data) {
	console.log(data)
  return request({
    url: '/qygl/company_listData',
    method: 'post',
	params:data
  })
}