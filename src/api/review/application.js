import request from '@/utils/request'

// 查询申请列表
export function listApplication(query) {
  return request({
    url: '/service/application/list',
    method: 'get',
    params: query
  })
}

// 查询申请详细
export function getApplication(id) {
  return request({
    url: '/service/application/' + id,
    method: 'get'
  })
}

// 新增申请
export function addApplication(data) {
  return request({
    url: '/service/application',
    method: 'post',
    data: data
  })
}

// 修改申请
export function updateApplication(data) {
  return request({
    url: '/service/application',
    method: 'put',
    data: data
  })
}

// 删除申请
export function delApplication(id) {
  return request({
    url: '/service/application/' + id,
    method: 'delete'
  })
}

export function applyPermission() {
  return request({
    url: '/service/application/' + id,
    method: 'post'
  })
}

