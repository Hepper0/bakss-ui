import request from '@/utils/request'

export function listBackup(query) {
  return request({
    url: '/veeam/backup/list',
    method: 'get',
    params: query
  })
}

export function getBackupChild(query) {
  return request({
    url: '/veeam/backup/child',
    method: 'get',
    params: query
  })
}

export function getBackupApplication(query) {
  return request({
    url: '/veeam/backup/application',
    method: 'get',
    params: query
  })
}

export function getBackupDetail(query) {
  return request({
    url: '/veeam/backup/detail',
    method: 'get',
    params: query
  })
}

export function getBackupPointDetail(query) {
  return request({
    url: '/veeam/backup/pointDetail',
    method: 'get',
    params: query
  })
}

export function getBackupPoint(query) {
  return request({
    url: '/veeam/backup/point',
    method: 'get',
    params: query
  })
}
