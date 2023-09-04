import { lazy } from "react";
import System from "@/chunks/System";
import { MyRoute } from "@/routes/renderRoutes";

const SystemModule = new System();

const routes: MyRoute[] = [
  {
    name: "SYSTEM",
    parent: "root",
    meta: {
      icon: "SettingOutlined",
      title: "系统管理",
      sort: 5,
      permission: "SYSTEM",
    },
  },
  {
    name: "USER",
    parent: "SYSTEM",
    path: "/f/sys/user",
    exact: true,
    isCache: true,
    isTransition: true,
    meta: {
      icon: "UserOutlined",
      title: "User",
      sort: 3,
      permission: "USER",
    },
    component: lazy(() => SystemModule.get("UserList")),
  },
  {
    name: "USER_ADD",
    path: "/f/sys/user/add",
    exact: true,
    isCache: true,
    isTransition: true,
    meta: {
      title: "新增用户",
    },
    component: lazy(() => SystemModule.get("UserEdit")),
  },
  {
    name: "USER_EDIT",
    path: "/f/sys/user/edit/:id",
    exact: true,
    isCache: true,
    isTransition: true,
    meta: {
      title: "编辑用户",
    },
    component: lazy(() => SystemModule.get("UserEdit")),
  },
  {
    name: "ROLE",
    parent: "SYSTEM",
    path: "/f/sys/role",
    exact: true,
    isCache: true,
    isTransition: true,
    meta: {
      icon: "ApartmentOutlined",
      title: "Role",
      sort: 4,
      permission: "ROLE",
    },
    component: lazy(() => SystemModule.get("RoleList")),
  },
  {
    name: "ROLE_ADD",
    path: "/f/sys/role/add",
    exact: true,
    isCache: true,
    isTransition: true,
    meta: {
      title: "新增角色",
    },
    component: lazy(() => SystemModule.get("RoleEdit")),
  },
  {
    name: "ROLE_EDIT",
    path: "/f/sys/role/edit/:id",
    exact: true,
    isCache: true,
    isTransition: true,
    meta: {
      title: "编辑角色",
    },
    component: lazy(() => SystemModule.get("RoleEdit")),
  },
  {
    name: "RESOURCE",
    parent: "SYSTEM",
    path: "/f/sys/resource",
    exact: true,
    isCache: true,
    isTransition: true,
    meta: {
      icon: "WarningOutlined",
      title: "Resource",
      sort: 4,
    },
    component: lazy(() => SystemModule.get("ResourceConfig")),
  },
  {
    name: "LOG",
    parent: "SYSTEM",
    path: "/f/sys/log",
    isCache: true,
    isTransition: true,
    meta: {
      icon: "FileSearchOutlined",
      title: "日志管理",
      sort: 5,
      permission: "LOG",
    },
    component: lazy(() => SystemModule.get("LogList")),
  },
  {
    name: "NATIONAL_CONFIG",
    parent: "SYSTEM",
    path: "/f/sys/national-config",
    isCache: true,
    isTransition: true,
    meta: {
      icon: "CloudServerOutlined",
      title: "地址配置",
      sort: 2,
      permission: "NATIONAL_CONFIG",
    },
    component: lazy(() => SystemModule.get("NationalConfig")),
  },
];

export default routes;
