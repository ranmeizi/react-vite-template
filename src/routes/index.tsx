import React from 'react'
import { lazy } from 'react'
import MainView from '../layouts/MainView'
import { MyRoute } from '@/routes/renderRoutes'
import SysRoutes from '@/chunks/System/routes'
import Example from '@/chunks/Example'
import { Redirect } from 'react-router-dom'
import { eachRoute } from '@/components/Menu/menuTree'
import EPage403 from '@/views/ErrorPage/403'
import EPage500 from '@/views/ErrorPage/500'
import Login from '@/views/Login'
import Homepage from '@/views/Homepage'

const ExampleModule = new Example()

const routes: MyRoute[] = [
    {
        path: '/',
        exact: true,
        render: () => <Redirect to='/f/sys/user' />
    },
    {
        path: ['/login'],
        exact: true,
        component: Login
    },
    {
        path: '/f',
        component: MainView,
        routes: [
            {
                path: '/f/403',
                isTransition: true,
                component: EPage403
            },
            {
                path: '/f/500',
                isTransition: true,
                component: EPage500
            },
            {
                name: 'HOMEPAGE',
                parent: 'root',
                path: '/f/homepage',
                isTransition: true,
                meta: {
                    icon: 'Html5Outlined',
                    title: '工作台',
                    sort: 1,
                    permission: '10001'
                },
                component: Homepage
            },
            ...SysRoutes,
            {
                name: 'EXAMPLE',
                parent: 'root',
                meta: {
                    icon: 'AntDesignOutlined',
                    title: '示例页面',
                    sort: 2,
                    permission: 'example-1'
                }
            },
            {
                name: 'EXAMPLE_LIST',
                parent: 'EXAMPLE',
                path: '/f/example/list',
                isCache: true,
                isTransition: true,
                meta: {
                    icon: 'InsertRowAboveOutlined',
                    title: '列表页',
                    sort: 1,
                    permission: 'example-2'
                },
                component: lazy(() => ExampleModule.get('List'))
            },
            {
                name: 'EXAMPLE_ERROR',
                parent: 'EXAMPLE',
                path: '/f/example/err',
                isCache: true,
                isTransition: true,
                meta: {
                    icon: 'BugOutlined',
                    title: '报错页面',
                    sort: 1
                },
                component: lazy(() => ExampleModule.get('ErrorTest'))
            },
        ],
    }
]

routes.forEach(route => eachRoute(route, 1))

export default routes
