import axios from "@/utils/Request/bfj";
import * as URLs from "./config";

/** 用户列表 */
export function query(params: Params.User.QueryListParams) {
  return axios
    .get<Res.page<DTOs.User.UserDTO>>(URLs.queryListUrl, {
      params,
    })
    .then((res) => res.data.data);
}

/** 使用id获取用户 */
export function findById(params: Params.User.FindByIdParams) {
  return axios.get<Res.data<DTOs.User.UserDTO>>(URLs.findByIdUrl, {
    params,
  });
}

/** 创建用户 */
export function createUser(params: Params.User.UserCreateParam) {
  return axios.post<Res.data<DTOs.User.UserDTO>>(URLs.createUrl, params);
}

/** 删除用户 */
export function deleteUserById(params: Params.User.FindByIdParams) {
  return axios.post<Res.data<DTOs.User.UserDTO>>(URLs.deleteByIdUrl, params);
}

/** 更新用户 */
export function updateUser(params: Params.User.UpdateUserParams) {
  return axios.post<Res.data<DTOs.User.UserDTO>>(URLs.updateUrl, params);
}
