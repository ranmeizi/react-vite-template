import store from '@/storeQk/store'
export type MicroApps = {
  name: string
  entry: string
  activeRule: string
  container: string
}
const microApps: MicroApps[] = [{
  name: 'sub-vue',
  entry: '//localhost:7777/subapp/sub-vue/',
  activeRule: '/f/qiankun',
  container: '#qiankun',
},
]

export const apps = microApps.map(item => {
  return {
    ...item,
    props: {
      routerBase: item.activeRule,
      getGlobalState: store.getGlobalState,
      removeTab: store.removeTab,
    }
  }
})