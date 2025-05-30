import request from '@/utils/request'

export function listProxy(page, pageSize, server) {
  return request({
    url: '/veeam/proxy/list',
    method: 'get',
    params: {
      page,
      pageSize
    },
    headers: {
      server
    }
  })
}

export function getProxyDetail(ID, server) {
  return request({
    url: '/veeam/proxy/detail',
    method: 'get',
    params: { ID },
    headers: {
      server
    }
  })
}

export function deleteProxy(name, server) {
  return request({
    url: '/veeam/proxy',
    method: 'delete',
    params: { name },
    headers: {
      server
    }
  })
}
