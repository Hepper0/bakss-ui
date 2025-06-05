import request from '@/utils/request'

export function listHost(page=1, pageSize=0, server) {
  return request({
    url: '/veeam/host/list',
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

export function getHostEntity(serverName, viewMode='HostAndVms', server) {
  return request({
    url: '/veeam/host/entity',
    method: 'get',
    params: {
      serverName,
      viewMode
    },
    headers: {
      server
    }
  })
}

export function getHostDatastore(serverName, server) {
  return request({
    url: '/veeam/host/datastore',
    method: 'get',
    params: { serverName },
    headers: {
      server
    }
  })
}

export function getHostResourcePool(serverName, server) {
  return request({
    url: '/veeam/host/resourcePool',
    method: 'get',
    params: { serverName },
    headers: {
      server
    }
  })
}

export function getHostSwitch(serverName, server) {
  return request({
    url: '/veeam/host/switch',
    method: 'get',
    params: { serverName },
    headers: {
      server
    }
  })
}

export function getHostNetwork(serverName, server) {
  return request({
    url: '/veeam/host/network',
    method: 'get',
    params: { serverName },
    headers: {
      server
    }
  })
}

export function getHostFolder(serverName, server) {
  return request({
    url: '/veeam/host/folder',
    method: 'get',
    params: { serverName },
    headers: {
      server
    }
  })
}
