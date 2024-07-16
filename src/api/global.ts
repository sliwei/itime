import appRequest from "@/utils/request";

// json
export const getJson = ({ url }) => {
  return appRequest.get<any>({ url });
};
