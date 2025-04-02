import request from '@/utils/request'

// 查询申请列表
export function listApply(query) {
  return request({
    url: '/service/apply/list',
    method: 'get',
    params: query
  })
}

// 查询申请详细
export function getApply(id) {
  return request({
    url: '/service/apply/' + id,
    method: 'get'
  })
}

// 新增申请
export function addApply(data) {
  return request({
    url: '/service/apply',
    method: 'post',
    data: data
  })
}

// 修改申请
export function updateApply(data) {
  return request({
    url: '/service/apply',
    method: 'put',
    data: data
  })
}

// 删除申请
export function delApply(id) {
  return request({
    url: '/service/apply/' + id,
    method: 'delete'
  })
}
