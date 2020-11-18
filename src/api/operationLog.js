import request from '@/utils/request'

//查询接口
/* {
  "key": "start",
  "description": "从第几条开始，从0开始"
},
{
  "key": "length",
  "description": "每页多少条"
},
{
  "key": "access_token",
  "description": "token令牌"
},
{
  "key": "queryName",
  "description": "部门名称"
},
{
  "key": "queryDeptId",
  "description": "查询部门"
},
{
  "key": "queryRole",
  "description": "查询角色"
} */
export function sysUser_listData(data) {
  return request({
    url: '/sys/sysUser_listData',
    method: 'post',
    params:data
  })
}
//详情
/* {
  "key": "access_token",
  "value": "d34ca26f-c400-4abb-9d04-ff0e646cba1c",
  "description": "token令牌"
},
{
  "key": "id",
  "value": "7587d4ac87d6adfd0002",
  "description": "部门主键"
} */
export function sysUser_getDetail(data) {
  return request({
    url: '/sys/sysUser_getDetail',
    method: 'post',
    params:data
  })
}

export function sysUser_listData(data) {
  return request({
    url: '/sys/sysUser_listData',
    method: 'post',
    params:data
  })
}

127.0.0.1:9001//?access_token=d34ca26f-c400-4abb-9d04-ff0e646cba1c&id=7587d4ac87d6adfd0002
