/* eslint-disable camelcase */
import request from '@/utils/request'
/**
 *
 * @param {*}  频道新闻推荐列表/内容
 */
export const articles = ({
  // 频道的id
  channel_id,
  // 时间戳
  timestamp,
  // 是否包含置顶
  with_top }) => {
  return request.get('/app/v1_1/articles', {
    params: {
      channel_id,
      timestamp,
      with_top
    }
  })
}

// 不喜欢文章
export const dislikeArticle = (id) => {
  return request.post('/app/v1_0/article/dislikes', {
    target: id
  })
}

// 拉黑作者
export const blackLists = (id) => {
  return request.post('/app/v1_0/user/blacklists', {
    target: id
  })
}

// 举报文章

export const reportArticle = ({
  target,
  type
}) => {
  return request.post('/app/v1_0/article/reports', {
    // 举报的文章id
    target,
    // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
    type
  })
}
