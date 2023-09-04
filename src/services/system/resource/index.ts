import axios from "@/utils/Request/bfj";
import * as URLs from "./config";

/** 创建资源 */
export function createResource(params: Params.Resource.AddResourceParams) {
  return axios.post<Res.data<DTOs.Resource.ResourceDto>>(
    URLs.createResourceUrl,
    params
  );
}

/** 更新资源 */
export function updateResource(params: Params.Resource.UpdateResourceParams) {
  return axios.post<Res.data<DTOs.Resource.ResourceDto>>(
    URLs.updateResourceUrl,
    params
  );
}

/**
 * 获取资源树
 */
export function getResourceTree() {
  return axios
    .post<Res.data<DTOs.Resource.ResourceNodeDto[]>>(URLs.getResourceTreeUrl, {
      code: "root",
    })
    .then((res) => res.data.data);
}

/** 使用 id 获取资源 */
export function findById(id: number) {
  return axios.get<Res.data<DTOs.Resource.ResourceDto>>(
    URLs.getResourcrByIdUrl,
    {
      params: {
        id,
      },
    }
  );
}

export function deleteById(id: number) {
  return axios.post<Res.data<DTOs.Resource.ResourceDto>>(
    URLs.deleteResourceByIdUrl,
    {
      id,
    }
  );
}
