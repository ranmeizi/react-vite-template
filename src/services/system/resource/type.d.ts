// request 请求参数类型
declare namespace Params {
  export namespace Resource {
    interface AddResourceParams {
      /**
       * 权限码
       */
      code: string;
      /**
       * 页面tooltip
       */
      desc?: string;
      /**
       * 资源名
       */
      name: string;
      order?: number;
      /**
       * 父节点id
       */
      parent: string;
      /**
       * 页面标题
       */
      title?: string;
      /**
       * 类型，1-普通 2-菜单
       */
      type: string;
      /**
       * 页面url
       */
      url?: string;
    }

    interface UpdateResourceParams {
      /**
       * 页面描述
       */
      desc?: string;
      /**
       * 资源id
       */
      id: number;
      /**
       * 资源名称
       */
      name?: string;
      /**
       * 排序
       */
      order?: number;
      /**
       * 页面title
       */
      title?: string;
      /**
       * 页面url
       */
      url?: string;
    }
  }
}
// response 传输对象类型
declare namespace DTOs {
  export namespace Resource {
    interface ResourceDto {
      /**
       * 资源code
       */
      code: string;
      /**
       * 创建时间
       */
      createdAt?: string;
      /**
       * 创建人id
       */
      createdBy?: string;
      /**
       * 页面描述
       */
      desc?: string;
      /**
       * 资源id
       */
      id: number;
      /**
       * 资源名称
       */
      name: string;
      /**
       * 父节点code
       */
      parent: string;
      /**
       * 页面title
       */
      title?: string;
      /**
       * 资源类型
       */
      type: string;
      /**
       * 更新时间
       */
      updatedAt?: string;
      /**
       * 更新人id
       */
      updatedBy?: string;
      /**
       * 页面url
       */
      url?: string;
    }

    interface ResourceDto {
      /**
       * 资源code
       */
      code: string;
      /**
       * 创建时间
       */
      createdAt?: string;
      /**
       * 创建人id
       */
      createdBy?: string;
      /**
       * 页面描述
       */
      desc?: string;
      /**
       * 资源id
       */
      id: number;
      /**
       * 资源名称
       */
      name: string;
      /**
       * 父节点code
       */
      parent: string;
      /**
       * 页面title
       */
      title?: string;
      /**
       * 资源类型
       */
      type: string;
      /**
       * 更新时间
       */
      updatedAt?: string;
      /**
       * 更新人id
       */
      updatedBy?: string;
      /**
       * 页面url
       */
      url?: string;
      /**
       * 排序
       */
      order?: number;
    }

    interface ResourceNodeDto extends ResourceDto {
      /** 子节点 */
      children: ResourceNodeDto[];
    }
  }
}
// 公共类型
declare namespace Types {
  export namespace Resource {}
}
