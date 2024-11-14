import { isH5 } from '@/utils'
import appRequest from '@/utils/request'
import axios from 'axios'

const BASE_URL = isH5 ? '/blog_api' : process.env.TARO_APP_API_URL

// json
export const getJson = ({ url }) => {
  return appRequest.get<any>({ url })
}

/**
 * lw 上传
 */
export const upload = (data) => {
  return axios.post(`${BASE_URL}/blog/manage/common/upload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
