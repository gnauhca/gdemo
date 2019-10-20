## 快速运行 demo 的 cli 工具

工具集成了一个 webpack 构建项目基本的配置和依赖，无需在每个 demo 重复配置和安装

demo 将快速拥有以下构建能力

* babel-loader (preset-env)
* 样式 loader (less)
* file-loader
* 简易 server

具体 demo 文件夹无需安装任何依赖即可运行

### 安装
npm i gdemo -g

### 场景

简易 demo 同时想需要 webpack 打包能力，类似 [https://github.com/gnauhca/dailyeffecttest](https://github.com/gnauhca/dailyeffecttest) 里边的 demo

### 入口文件

./index.js

### dev

gdemo serve



