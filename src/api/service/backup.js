import request from '@/utils/request'

// 查询备份列表
export function listBackup(query) {
  return request({
    url: '/service/backup/list',
    method: 'get',
    params: query
  })
}

export function listBackupByIds(ids) {
  return request({
    url: '/service/backup?' + ids,
    method: 'get',
  })
}

export function myBackup(query) {
  return request({
    url: '/service/backup/my',
    method: 'get',
    params: query
  })
}

// 查询备份详细
export function getBackup(id) {
  return request({
    url: '/service/backup/' + id,
    method: 'get'
  })
}

// 新增备份
export function addBackup(data) {
  return request({
    url: '/service/backup',
    method: 'post',
    data: data
  })
}

// 修改备份
export function updateBackup(data) {
  return request({
    url: '/service/backup',
    method: 'put',
    data: data
  })
}

// 删除备份
export function delBackup(id) {
  return request({
    url: '/service/backup/' + id,
    method: 'delete'
  })
}

// export function grantBackup(data) {
//   return request({
//     url: '/service/backup',
//     method: 'post',
//     data: data
//   })
// }

export function backupStrategy(params) {
  return request({
    url: '/service/backup/strategy',
    method: 'get',
    params: params
  })
}

export function backupHistory(params) {
  return request({
    url: '/service/backup/history',
    method: 'get',
    params: params
  })
}
