import request from '@/utils/request'

export function listRepository(page, pageSize, server) {
  return request({
    url: '/veeam/repository/list',
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

export function getRepositoryDetail(ID, server) {
  return request({
    url: '/veeam/repository/detail',
    method: 'get',
    params: { ID },
    headers: {
      server
    }
  })
}

export function deleteRepository(name, server) {
  return request({
    url: '/veeam/repository',
    method: 'delete',
    params: { name },
    headers: {
      server
    }
  })
}
