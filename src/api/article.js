/* eslint-disable camelcase */
/* eslint-disable no-tabs */
/* eslint-disable no-undef */
import request from '@/utils/request.js'

/**
 * 获取新闻文章详情  文章的id
 */
export const getArticles = (id) => {
  return request.get(`/app/v1_0/articles/${id}`)
}

// 对文章点赞操作
export const liking = (id) => {
  return request.post('/app/v1_0/article/likings', {
    target: id
  })
}
// 对文章取消点赞操作
export const disliking = (id) => {
  return request.delete(`/app/v1_0/article/likings/${id}`)
}
// 对文章不喜欢操作
export const disloving = (id) => {
  return request.post('/app/v1_0/article/dislikes', {
    target: id
  })
}
// 取消对文章不喜欢操作
export const loving = (id) => {
  return request.delete(`/app/v1_0/article/dislikes/${id}`)
}

// 获取评论或评论回复
export const comments = ({
  isArticle,
  source,
  offset,
  limit

}) => {
  return request.get('/app/v1_0/comments', {
    params: {
      type: isArticle ? 'a' : 'c', // a或c	评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
      source, // 源id，文章id或评论id
      offset,	// 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      limit	// 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
    }
  })
}

// 添加评论或评论回复
export const addComment = ({
  target,		// 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
  content,			// 评论内容
  art_id	// 文章id，对评论内容发表回复时需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
}) => {
  return request.post('/app/v1_0/comments', {
    target,
    content,
    art_id
  })
}
