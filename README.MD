# react-vite-template
vite 搭建的 react 开发平台  

建议使用 typescript 语言开发，这样开发过程中会有类型提示，别的小伙伴读代码也会方便很多

因为用的是vite，dev模式使用的是modulejs可能有些浏览器不适配，不过build时添加了legacy适配ie11浏览器，不过这个项目的代码css没有适配ie11

## 开始
使用 ```npm install``` 或者 ```yarn install``` 安装依赖  
启动dev服务 ```npm run dev``` 或者 ```yarn dev```  
build ```npm run build``` 或者 ```yarn build```  
值得一提，在启动项目时，代码中会读取环境变量中的 NETWORK_ENV 去匹配不同环境的接口前缀

需要注意！  
因为vite是esmodule，在请求资源时才去读代码，没有找到很好的时机去lint代码，请手动运行```npm run lint``` 或者 ```yarn lint``` 去约束你的代码  

如果需要执行测试js ```npm run test```或者```yarn test```

## 技术栈
React、Typescript、less、vite、jest

## 目录结构
\- build   viteconfig 文件  
\- public   public文件夹  
\-- images   图片资源  
\-- mock    假数据json  
\- src  
\-- @types   类型  
\-- assets   资源  
\-- chunks   异步模块  
\-- components    公共组件  
\-- config   配置  
\-- layouts   布局框架  
\-- redux  
\-- routes   路由配置  
\-- services   后台服务相关  
\-- utils   工具函数  
\-- views   页面(同步模块) 如果想拆分异步模块，请写到 chunks 里  
\- test   单元测试文件

## 基础搭建
### 模块懒加载方案
vite 没发现很好的模块命名和组合异步模块的方法(如果有可以改进一下，像webpack magic comment)   
我们在 /chunks 目录下必须创建一个 index.tsx 作为这个模块的入口，里面的 Module 类中，有一个 **get 函数** 去获取 Module.tsx 中暴露的模块  
在 Module.tsx 文件中定义需要暴露的模块  
使用方法  
```ts
import Example from '@/chunks/Example'

const ExampleModule = new Example()

ExampleModule.get('List') // 获得暴露的List模块，其实是 import() 函数的返回值
```

### 换肤方案
使用 less 变量和 cssinjs 2种方案换肤
#### less
根据 body 类名 ```rvt-body-???``` 引用 theme/ 变量文件
#### cssinjs
提供 makeStyles 函数构造一个 useStyle hook ,会传入一个theme变量作为调色板，theme变量在 theme/ 下的 js 文件中定义
[makeStyles 函数](./src/theme/useThemeStyle.ts)
```ts
// 例子 怎样使用cssinjs theme
const useStyle = makeStyles((theme) => ({
    t1: {
        color: theme.fc.text
    },
    t2: {
        color: theme.fc.text
    }
}))

function Logo({ collapsed }: any) {
    const styles = useStyle()
    return <div className='logo'>
        <div className='t1' style={collapsed ? { fontSize: '12px', ...styles.t1 } : styles.t1}>{collapsed ? 'R' : 'React-Vite-Template'}</div>
        <div className='t2' style={styles.t2}>{collapsed ? '' : 'boboan'}</div>
        <div className='box2'>
            <img src={backImg} className='avatar-back' />
        </div>
        <div className='box'>
            <div className='avatar'></div>
        </div>
    </div >
}
```
### 路由模块 
路由模块使用了 [react-activation](https://github.com/CJY0208/react-activation) 做缓存， [react-transition-group](https://github.com/reactjs/react-transition-group) 做过渡动画  
自定义了 routeConfig 见 [CustRouteParam](./src/routes/renderRoutes.tsx) 
使用 isCache 控制路由组件是否需要缓存
使用 isTransition 控制路由组件是否需要过度动画

### 基础布局
布局和 Page 组件

### tab签
使用 tabs 控制 路由组件 react-activation 的缓存
使用 TAB_LIMIT 控制最多展示多少 tab 页
[Tab组件](./src/components/Header/Tab.tsx)

### 示例页面
使用 ant-design 风格  
[工作台(首页)](./src/views/Homepage/index.tsx)
[列表页](./src/chunks/Example/pages/Pokemon/List/index.tsx)

## history 路由
使用history路由，不用锚点了，抓包软件抓不到hash
但这对静态服务有些要求，在nginx 上需要设置 try_file 使请求路由地址时永远返回index.html

## 避免使用context
react-activation这个库改变组件层级，对context有所影响，不想再修补索性不用了，真的用的话可以去看作者写的解决方案自行解决

## 别用require
vite既然是esmodule实现的，为什要用commonjs的语法呢