import request from '@/utils/request'

export function applyPermission(data) {
  return request({
    url: '/service/apply/permission',
    method: 'post',
    data: data
  })
}
