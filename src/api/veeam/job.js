import request from '@/utils/request'

export function listJob(page, pageSize, server) {
  return request({
    url: '/veeam/job/list',
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

export function getJobDetail(name, server) {
  return request({
    url: '/veeam/job/detail',
    method: 'get',
    params: { name },
    headers: {
      server
    }
  })
}

export function startJob(name, server) {
  return request({
    url: '/veeam/job/start',
    method: 'post',
    data: { name },
    headers: {
      server
    }
  })
}

export function stopJob(name, server) {
  return request({
    url: '/veeam/job/stop',
    method: 'post',
    data: { name },
    headers: {
      server
    }
  })
}

export function enableJob(name, server) {
  return request({
    url: '/veeam/job/enable',
    method: 'post',
    data: { name },
    headers: {
      server
    }
  })
}

export function disableJob(name, server) {
  return request({
    url: '/veeam/job/disable',
    method: 'post',
    data: { name },
    headers: {
      server
    }
  })
}

export function createJob(data, server) {
  return request({
    url: '/veeam/job/create',
    method: 'post',
    data: data,
    headers: {
      server
    }
  })
}

export function updateJob(data, server) {
  return request({
    url: '/veeam/job/update',
    method: 'post',
    data: data,
    headers: {
      server
    }
  })
}
