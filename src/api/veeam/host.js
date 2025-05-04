import request from '@/utils/request'

export function listHost(query) {
  return request({
    url: '/veeam/host/list',
    method: 'get',
    params: query
  })
}

export function getHostEntity(query) {
  return request({
    url: '/veeam/host/entity',
    method: 'get',
    params: query
  })
}

export function getHostDatastore(query) {
  return request({
    url: '/veeam/host/datastore',
    method: 'get',
    params: query
  })
}

export function getHostResourcePool(query) {
  return request({
    url: '/veeam/host/resourcePool',
    method: 'get',
    params: query
  })
}

export function getHostSwitch(query) {
  return request({
    url: '/veeam/host/switch',
    method: 'get',
    params: query
  })
}

export function getHostNetwork(query) {
  return request({
    url: '/veeam/host/network',
    method: 'get',
    params: query
  })
}

export function getHostFolder(query) {
  return request({
    url: '/veeam/host/folder',
    method: 'get',
    params: query
  })
}
