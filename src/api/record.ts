import { isH5 } from '@/utils'
import appRequest from '@/utils/request'

const BASE_URL = isH5 ? '/itime_api' : process.env.TARO_APP_API_URL

// key登录接口
export const loginKey = (data) => {
  return appRequest.post({
    url: `${BASE_URL}/itime/api/users/loginKey`,
    data
  })
}

// 添加记录
export const recordCreate = (data) => {
  return appRequest.post({
    url: `${BASE_URL}/itime/api/record/create`,
    data
  })
}

// 查询权限
export const findAuthority = () => {
  return appRequest.get({
    url: `${BASE_URL}/itime/api/role/findAuthority`
  })
}

// 获取列表
// where {}
// page 1
// size 10
export const recordFindAll = (data) => {
  return appRequest.post({
    url: `${BASE_URL}/itime//api/record/findAll`,
    data
  })
}
