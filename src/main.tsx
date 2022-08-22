import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.less'
import App from './App'
import { Provider } from 'react-redux'
import { AliveScope } from 'react-activation'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { registerMicroApps, start } from 'qiankun'
import { apps } from './apps'
import './base.less'


function render() {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AliveScope>
          <App />
        </AliveScope>
      </PersistGate>
    </Provider>
    ,
    document.getElementById('root')
  )
}

render();
const microApps = apps.map((app => ({
  ...app,
})))
registerMicroApps(microApps, {
  beforeLoad: app => {
    console.log('before load app.name=====>>>>>', app.name)
    return Promise.resolve()
  },
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
      return Promise.resolve()
    }
  ],
  afterMount: [
    app => {
      console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
      return Promise.resolve()
    }
  ],
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
      return Promise.resolve()
    }
  ]
})
start()