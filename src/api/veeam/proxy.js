import request from '@/utils/request'

export function listProxy(query) {
  return request({
    url: '/veeam/proxy/list',
    method: 'get',
    params: query
  })
}

export function getProxyDetail(query) {
  return request({
    url: '/veeam/proxy/detail',
    method: 'get',
    params: query
  })
}

export function deleteProxy(query) {
  return request({
    url: '/veeam/proxy',
    method: 'delete',
    params: query
  })
}
