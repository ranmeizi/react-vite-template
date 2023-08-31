import axios from "@/utils/Request/bfj";
import * as URLs from "./config";

export function login(params: Params.Auth.LoginParams) {
  return axios.post<Res.data<DTOs.Auth.LoginSuccDto>>(URLs.loginUrl, params);
}
