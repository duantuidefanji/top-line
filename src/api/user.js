/* eslint-disable camelcase */
/* eslint-disable no-undef */
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

// 关注用户
export const concern = (id) => {
  return request.post('/app/v1_0/user/followings', {
    target: id
  })
}
// 取消关注用户
export const cancelConcern = (id) => {
  return request.delete(`/app/v1_0/user/followings/${id}`)
}

// 获取用户个人资料
export const getuserInfo = () => {
  return request.get('/app/v1_0/user')
}

// 编辑用户信息
export const getUserProfile = () => {
  return request.get('/app/v1_0/user/profile')
}

// 用户上传头像图片
export const uploadImg = (key, file) => {
  const formData = new FormData()
  formData.append(key, file)
  return request.patch('/app/v1_0/user/photo', formData)
}

// 获取用户的粉丝列表
export const followers = ({
  page,
  per_page
}) => {
  return request.get('/app/v1_0/user/followers', {
    params: {
      page, // 页数
      per_page// 每页数量
    }
  })
}

// 获取用户的关注列表
export const followings = ({
  page,
  per_page
}) => {
  return request.get('/app/v1_0/user/followings', {
    params: {
      page, // 页数
      per_page// 每页数量
    }
  })
}
