import request from '@/utils/request'

/**
 *
 * @param {*}登录 提交 服务器的数据  mobile 和 code
 */
export const login = ({
  mobile,
  code
}) => {
  return request.post('/app/v1_0/authorizations', {
    code,
    mobile
  })
}
