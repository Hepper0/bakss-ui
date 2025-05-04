import request from '@/utils/request'

export function listJob(query) {
  return request({
    url: '/veeam/job/list',
    method: 'get',
    params: query
  })
}

export function getJobDetail(query) {
  return request({
    url: '/veeam/job/detail',
    method: 'get',
    params: query
  })
}

export function startJob(data) {
  return request({
    url: '/veeam/job/start',
    method: 'post',
    data: data
  })
}

export function stopJob(data) {
  return request({
    url: '/veeam/job/stop',
    method: 'post',
    data: data
  })
}

export function enableJob(data) {
  return request({
    url: '/veeam/job/enable',
    method: 'post',
    data: data
  })
}

export function disableJob(data) {
  return request({
    url: '/veeam/job/disable',
    method: 'post',
    data: data
  })
}

export function createJob(data) {
  return request({
    url: '/veeam/job/create',
    method: 'post',
    data: data
  })
}

export function updateJob(data) {
  return request({
    url: '/veeam/job/update',
    method: 'post',
    data: data
  })
}
