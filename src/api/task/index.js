import request from '@/utils/request'

// 申请客户端管理权列表
export function getTodoTaskList(params) {
  return request({
    url: '/service/task/todo',
    method: 'get',
    params: params
  })
}

// 申请客户端管理权列表
export function getDoneTaskList(params) {
  return request({
    url: '/service/task/done',
    method: 'get',
    params: params
  })
}

export function getAllTaskList() {
  return request({
    url: '/service/task/list',
    method: 'get',
  })
}
