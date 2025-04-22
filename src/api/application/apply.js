import request from '@/utils/request'

// 申请客户端管理权列表
export function applyPermission(data) {
  return request({
    url: '/service/apply/permission',
    method: 'post',
    data: data
  })
}

export function applyModifyDirectory(data) {
  return request({
    url: '/service/apply/modifyDirectory',
    method: 'post',
    data: data
  })
}

export function applyCreateBackup(data) {
  return request({
    url: '/service/apply/createBackup',
    method: 'post',
    data: data
  })
}

export function applyCreateRestore(data) {
  return request({
    url: '/service/apply/createRestore',
    method: 'post',
    data: data
  })
}

export function applyStrategy(data) {
  return request({
    url: '/service/apply/strategy',
    method: 'post',
    data: data
  })
}

export function applyChangeUser(data) {
  return request({
    url: '/service/apply/changeUser',
    method: 'post',
    data: data
  })
}

export function applyBackup(data) {
  return request({
    url: '/service/apply/backup',
    method: 'post',
    data: data
  })
}

