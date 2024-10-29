/**
 * @description 获取/存储token
 *
 * */

const tokeKey = 'USER_TOKEN'

export function setToken(token: string) {
  localStorage.setItem(tokeKey, token)
}

export function getToken() {
  localStorage.getItem(tokeKey)
}

export function removeToken() {
  localStorage.removeItem(tokeKey)
}
