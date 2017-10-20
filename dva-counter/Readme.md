# DVA简单Demo

## 简介
Dva是由蚂蚁前端团队开发的，基于redux、redux-saga和react-router的轻量级前端框架  

## 参考资料
[dva官方介绍](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)  
[dva知识导图](https://github.com/dvajs/dva-knowledgemap)  
[dva API](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md)

## 源码解析
model定义
  namespace: 命名空间，dispatch的时候action应该是{type: '命名空间/reducer名'}
  state: 可以是任意数据类型
  reducers: 纯函数，名字要和想要响应的action的type一致，(oldState)=>(newState)
