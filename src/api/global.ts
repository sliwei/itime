import { isH5 } from "@/utils";
import appRequest from "@/utils/request";

const BASE_URL = isH5 ? "/blog_api" : process.env.TARO_APP_API_URL;

// json
export const getJson = ({ url }) => {
  return appRequest.get<any>({ url });
};

/**
 * lw 上传
 */
export const upload = (data, name) => {
  return appRequest.upload({
    url: `${BASE_URL}/blog/manage/common/upload`,
    formData: data,
    fileName: name,
    filePath: name,
    name: "file",
  });
};
