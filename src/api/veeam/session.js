import request from '@/utils/request'

export function listSession(page, pageSize, server) {
  return request({
    url: '/veeam/jobSession/list',
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

export function getSessionDetail(ID, server) {
  return request({
    url: '/veeam/jobSession/detail',
    method: 'get',
    params: { ID },
    headers: {
      server
    }
  })
}
