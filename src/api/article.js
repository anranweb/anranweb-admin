import request from '@/utils/request'
const qs = require('qs')

// 获取文章栏目
export function articleColumn() {
  return request({
    url: '?service=App.Sys_Column.SelectAll',
    method: 'get',
    data: ''
  })
}

// 新增或修改文章
export function addArticle(d) {
  return request({
    url: '?service=App.Sys_Article.AddArticle',
    method: 'post',
    data: qs.stringify(d)
  })
}

// 查询文章列表
export function articleList(d) {
  return request({
    url: '?service=App.Sys_Article.SelectArticle',
    method: 'post',
    data: qs.stringify(d)
  })
}

// 更新文章状态
export function updateArticleState(d) {
  return request({
    url: '?service=App.Sys_Article.UpdataState',
    method: 'post',
    data: qs.stringify(d)
  })
}

// 删除文章
export function deleteArticle(ids) {
  return request({
    url: '?service=App.Sys_Article.DeleteArticle',
    method: 'get',
    params: { ids }
  })
}

// 文章详情
export function articleInfo(id) {
  return request({
    url: '?service=App.Sys_Article.SelectArticleInfo',
    method: 'get',
    params: { id }
  })
}

// 栏目列表
export function getColumnList() {
  return request({
    url: '?service=App.Sys_Column.SelectAll',
    method: 'get',
    params: ''
  })
}

export function addColumn(d) {
  return request({
    url: '?service=App.Sys_Column.AddInfo',
    method: 'post',
    data: qs.stringify(d)
  })
}

export function deleteColumn(id) {
  return request({
    url: '?service=App.Sys_Column.DeleteColumn',
    method: 'get',
    params: { id }
  })
}
