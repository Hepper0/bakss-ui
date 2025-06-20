import request from '@/utils/request'

export function listFileShareServer(page, pageSize, server) {
  return request({
    url: '/veeam/fileShare/server/list',
    method: 'get',
    params: {
      page,
      pageSize,
    },
    headers: {
      server
    }
  })
}

export function listFileShareFolder(serverId, path, server) {
  return request({
    url: '/veeam/fileShare/folder/list',
    method: 'get',
    params: {
      serverId,
      path
    },
    headers: {
      server
    }
  })
}
