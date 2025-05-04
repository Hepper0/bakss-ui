import request from '@/utils/request'

export function listRepository(query) {
  return request({
    url: '/veeam/repository/list',
    method: 'get',
    params: query
  })
}

export function getRepositoryDetail(query) {
  return request({
    url: '/veeam/repository/detail',
    method: 'get',
    params: query
  })
}

export function deleteRepository(query) {
  return request({
    url: '/veeam/repository',
    method: 'delete',
    params: query
  })
}
