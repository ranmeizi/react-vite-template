import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { setCollapsed, setTheme } from '@/redux/actions/app'
import * as icons from '@ant-design/icons'
import Complete from './ExampleSearch'

const collapsedSelector = (state: any) => state.app.collapsed
const themeSelector = (state: any) => state.app.theme

export default function () {

    const collapsed = useSelector(collapsedSelector)
    const theme = useSelector(themeSelector)
    const dispatch = useDispatch()

    return <div className='f-r a-center j-between' style={{ height: '100%' }}>
        <div className='f-r a-center'>
            <Button type="primary" style={{ marginRight: '20px' }} onClick={() => dispatch(setCollapsed(!collapsed))}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button>
            <Complete />
        </div>
        <div className='f-r'>
            <IconButton
                className={`dark-mode`}
                icon='BgColorsOutlined'
                text='深色模式'
                active={theme === 'dark'}
                onClick={() => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))}
            />
            <IconButton icon='SettingOutlined' text='个性配置' onClick={() => Modal.info({
                title: '个性配置',
                content: '我还没想好能配什么'
            })} />
            <IconButton className='gitee' icon='GoogleOutlined' text='git' onClick={() => Modal.confirm({
                title: '系统提示',
                icon: <icons.ExclamationCircleOutlined />,
                content: <div>
                    <p>即将跳转</p>
                    <p><a>https://gitee.com/boboanzuiniubi/react-vite-template/tree/pc/</a></p>
                    <p>pc 分支,多多提建议</p>
                </div>,
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    window.open('https://gitee.com/boboanzuiniubi/react-vite-template/tree/pc/')
                }
            })} />
        </div>
    </div>
}

type IconButtonTypes = {
    icon: keyof typeof icons,
    text: string,
    className?: string,
    active?: boolean,
    onClick?: VoidFunction
}

function IconButton({
    icon,
    text,
    className = '',
    active,
    onClick = () => { return }
}: IconButtonTypes) {
    const [hover, setHover] = useState(false)
    return <div
        className={`f-c j-between a-center header-btn ${active ? 'active' : ''} ${hover ? 'hover' : ''} ${className}`}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    >
        {
            icon in icons
                ? React.createElement(icons[icon] as React.ComponentType<any>, {
                    style: {
                        fontSize: '24px'
                    }
                })
                : null
        }
        <div>{text}</div>
    </div>
}