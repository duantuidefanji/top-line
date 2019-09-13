/* eslint-disable camelcase */
import request from '@/utils/request'

/**
 *   获取用户频道列表
 */
export const channel = () => {
  return request.get('/app/v1_0/user/channels')
}
