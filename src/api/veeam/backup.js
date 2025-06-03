import request from '@/utils/request'

export function listBackup(jobName, page, pageSize, server) {
  return request({
    url: '/veeam/backup/list',
    method: 'get',
    params: {
      jobName,
      page,
      pageSize
    },
    headers: {
      server
    }
  })
}

export function getBackupChild(parentId, server) {
  return request({
    url: '/veeam/backup/child',
    method: 'get',
    params: {
      parentId
    },
    headers: {
      server
    }
  })
}

export function getBackupApplication(Names, server) {
  return request({
    url: '/veeam/backup/application',
    method: 'get',
    params: {
      Names
    },
    headers: {
      server
    }
  })
}

export function getBackupDetail(ID, server) {
  return request({
    url: '/veeam/backup/detail',
    method: 'get',
    params: { ID },
    headers: {
      server
    }
  })
}

export function getBackupPointDetail(ID, backupId, server) {
  return request({
    url: '/veeam/backup/pointDetail',
    method: 'get',
    params: {
      ID,
      backupId
    },
    headers: {
      server
    }
  })
}

export function getBackupPoint(ID, server) {
  return request({
    url: '/veeam/backup/point',
    method: 'get',
    params: { ID },
    headers: {
      server
    }
  })
}
