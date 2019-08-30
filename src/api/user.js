import request from '@/utils/request'
const qs = require('qs')

export function login(d) {
  return request({
    url: '?service=App.Sys_User.Login',
    method: 'post',
    data: qs.stringify(d)
  })
}

export function getInfo(userId) {
  return request({
    url: '?service=App.Sys_User.GetUserInfo',
    method: 'get',
    params: { userId }
  })
}

export function logout(userId) {
  return request({
    url: '?service=App.Sys_User.Logout',
    method: 'get',
    params: { userId }
  })
}

export function editPassword(d) {
  return request({
    url: '?service=App.Sys_User.EditPassword',
    method: 'post',
    data: qs.stringify(d)
  })
}

export function getUserList(d) {
  return request({
    url: '?service=App.Sys_User.GetAllUser',
    method: 'post',
    data: qs.stringify(d)
  })
}

// 新增修改用户
export function editUser(d) {
  return request({
    url: '?service=App.Sys_User.EditUser',
    method: 'post',
    data: qs.stringify(d)
  })
}

export function deleteUser(ids) {
  return request({
    url: '?service=App.Sys_User.DeleteUser',
    method: 'get',
    params: { ids }
  })
}
