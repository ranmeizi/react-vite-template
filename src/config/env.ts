const NETWORK_ENV = (process.env.NETWORK_ENV as Envs) || "DEVELOP";

// 环境变量可选值
type Envs = "DEVELOP" | "TEST" | "UAT" | "RELEASE";

// 服务地址列表
type Configs = {
  bfjServer: "bafojo 后台服务地址";
  testServer: "测试后台服务地址";
  routeBasename: "前端路由基地值";
};

type ConfigList = Record<keyof Configs, string>;

export type EnvConfig = Record<Envs, ConfigList>;

const config: EnvConfig = {
  DEVELOP: {
    bfjServer: "http://127.0.0.1:3000",
    testServer: "试一下",
    routeBasename: "/",
  },
  TEST: {
    bfjServer: "http://127.0.0.1:3000",
    testServer: "试一下",
    routeBasename: "/",
  },
  UAT: {
    bfjServer: "http://127.0.0.1:3000",
    testServer: "试一下",
    routeBasename: "/",
  },
  RELEASE: {
    bfjServer: "http://127.0.0.1:3000",
    testServer: "试一下",
    routeBasename: "/",
  },
};

export default config[NETWORK_ENV];
