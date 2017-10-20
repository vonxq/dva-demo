# DVA简单Demo  
  
## 简介  
Dva是由蚂蚁前端团队开发的，基于redux、redux-saga和react-router的轻量级前端框架    
  
## 参考资料  
[dva官方介绍](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)    
[dva知识导图](https://github.com/dvajs/dva-knowledgemap)    
[dva API](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md)  
  
## 源码解析  
```javascript  
// 创建,除hostory其他非必须  
const app = dva({  
  history: browserHistory,  
  initialState: {},//(默认{})  
  onError,  
  onAction,  
  onStateChange,  
  onReducer,  
  onEffect,  
  onHmr,  
  extraReducers,  
  extraEnhancers,  
});  
  
// 配置hooks或插件  
app.use({  
  onError,  
  onAction,  
  onStateChange,  
  onReducer,  
  onEffect,  
  onHmr,  
  extraReducers,  
  extraEnhancers,  
  createLoading(opts),  
})  
// 注册model  
app.model(model)  
// model格式: {}  
// 注册路由，返回的是一个路由组件  
// import { Router, Switch, Route } from 'dva/router';  
// 注意: history = app._history  
app.router(({ history, app }) => RouterConfig)  
// start,两种方式  
// 直接加selector  
app.start('#root');  
// 方式2. 返回一个组件，手动render  
import { IntlProvider } from 'react-intl';  
...  
const App = app.start();  
ReactDOM.render(<IntlProvider><App /></IntlProvider>, htmlElement);  
```  
  
model定义，一个对象，含以下属性  
  namespace: 命名空间，dispatch的时候action应该是{type: '命名空间/reducer名'}  
  state: 可以是任意数据类型  
  reducers: 纯函数，名字要和想要响应的action的type一致，(oldState)=>(newState)  
  effects: 处理异步操作和业务逻辑*(action, effects) => void 或 [*(action, effects) => void, { type }]。  
  subscriptions: 订阅数据源({ dispatch, history }, done) => unlistenFunction。实例返回的是一个订阅方法(订阅history方法)，为什么官网Api说要返回一个unlistenFunction???  
  router: app.router(({ history, app }) => RouterConfig)  
  
```javascript  
// https://github.com/ctrlplusb/react-async-component  
const AsyncProduct = asyncComponent({  
  resolve: () => System.import('./Product'),  
  LoadingComponent: ({ productId }) => <div>Loading {productId}</div>, // Optional  
  ErrorComponent: ({ error }) => <div>{error.message}</div> // Optional  
});  
// 动态加载React组件  
import dynamic from 'dva/dynamic';  
// 返回的是与model绑定的组件  
  const Users = dynamic({  
    app,  
    models: () => [  
      import('./models/users'),  
    ],  
    component: () => import('./routes/Users'),  
  })  
```  
  
## 开发步骤梳理  
1. 建立dva()  
2. 加入插件，start
3. 添加router  
4. router.js中输出Router,组件使用dynamic和app、model连接起来  
5. 组件定义处: 组件根据内部操作定义一些dispatch(props提供),使用connect绑定一些hooks（mapStateToProps），获取model中的数据  
6. model定义: 按需定义，然后在router中引入即可

## 存在问题
1. 项目的model是在getComponent中引入的，和用dynamic有何不同???
2. 