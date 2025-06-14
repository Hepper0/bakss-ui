import request from '@/utils/request'

export function listProtestGroup(page, pageSize, server) {
  return request({
    url: '/veeam/protectGroup/list',
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
