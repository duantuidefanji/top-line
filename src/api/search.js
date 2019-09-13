/* eslint-disable no-tabs */
/* eslint-disable camelcase */
import request from '@/utils/request.js'

// 获取联想建议

export const getSuggest = (q) => {
  return request.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}

// 搜索结果展示
export const searchResult = ({
  page,		// 页数，不传默认为1
  per_page,		// 每页数量，不传每页数量由后端决定
  q			// 搜索关键词
}) => {
  return request.get('/app/v1_0/search', {
    params: {
      page,
      per_page,
      q
    }
  })
}
