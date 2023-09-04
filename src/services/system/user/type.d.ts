// request 请求参数类型
declare namespace Params {
  export namespace User {
    interface QueryListParams {
      email?: string;
      mobile?: string;
      name?: string;
      nickname?: string;
      page_num?: number;
      page_size?: number;
    }

    interface FindByIdParams {
      id: number;
    }

    interface UserCreateParam {
      /**
       * 邮箱，邮箱
       */
      email?: string;
      /**
       * 手机号，手机号
       */
      mobile?: string;
      /**
       * 昵称，昵称
       */
      nickname?: string;
      /**
       * 性别，1-男 2-女
       */
      sex?: string;
      /**
       * 用户名，用户名
       */
      uname: string;
    }

    interface UpdateUserParams {
      /**
       * 邮箱
       */
      email?: string;
      /**
       * 用户id
       */
      id: number;
      /**
       * 手机号
       */
      mobile?: string;
      /**
       * 昵称
       */
      nickname?: string;
      /**
       * 性别 1-男 2-女
       */
      sex?: string;
    }

    interface EnabledParams {
      /**
       * 启用状态
       */
      enabled: number;
      /**
       * ID
       */
      id: number;
    }
  }
}
// response 传输对象类型
declare namespace DTOs {
  export namespace User {
    export interface UserDTO {
      /**
       * 创建时间，创建时间
       */
      createdAt: string;
      /**
       * 创建人，创建人
       */
      createdBy: string;
      /**
       * 邮箱，邮箱
       */
      email: string;
      /**
       * 启用状态，启用状态
       */
      enabled: boolean;
      /**
       * 用户id，用户id
       */
      id: number;
      /**
       * 手机号，手机号
       */
      mobile: string;
      /**
       * 昵称，昵称
       */
      nickname: string;
      /**
       * 性别，性别
       */
      sex: string;
      /**
       * 用户名，用户名
       */
      uname: string;
      /**
       * 更新时间，更新时间
       */
      updatedAt: null | string;
      /**
       * 更新人，更新人
       */
      updatedBy: null | string;
    }
  }
}
// 公共类型
declare namespace Types {
  export namespace User {}
}
