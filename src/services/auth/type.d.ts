// request 请求参数类型
declare namespace Params {
    export namespace Auth {
        type LoginParams = {
            uname: string
            psw: string
        }
    }
}
// response 传输对象类型
declare namespace DTOs {
    export namespace Auth {
        type LoginSuccDto = {
            access_token: string
            refresh_token: string
            expire: number
        }
    }
}
// 公共类型
declare namespace Types {
    export namespace Auth {

    }
}