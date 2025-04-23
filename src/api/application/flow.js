import request from '@/utils/request'

export function getFlowByAppId(params) {
  return request({
    url: '/service/application/flow/list',
    method: 'get',
    params: params
  })
}
