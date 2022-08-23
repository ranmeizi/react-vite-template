import { initGlobalState, MicroAppStateActions } from 'qiankun';

const initialState: Record<string, any> = {
  user: {
    name: 'qiankun',
    age: 10
  }
};
type ExtendAction = {
  getGlobalState: (key: string) => any
  removeTab: (key: string) => any
} & MicroAppStateActions

const storeQk: ExtendAction = {
  ...initGlobalState(initialState),
  onGlobalStateChange: ((state: any) => {
    for (const key in state) {
      initialState[key] = state[key];
    }
  }),
  getGlobalState: (key: string) => {
    console.log('key', key);
    return key ? initialState[key] : initialState;
  },
  removeTab: () => {
    console.log('删除tab');
  }
};

export default storeQk;
