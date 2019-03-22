taro typescript 模板简介

### get

```cmd
 git clone ssh://git@gitlab.58wld.com:1122/weleadin-front-end/taro_ts_template.git
```

### install

```cmd
    yarn
    yarn dev:h5
    yarn dev:weapp
```

### 目录简介
├── dist                   编译结果目录
├── config                 配置目录
|   ├── dev.js             开发时配置
|   ├── index.js           默认配置
|   └── prod.js            打包时配置
├── src                    源码目录
|   ├── components         常规组件文件夹
|   ├── config             配置存放文件夹
|   ├── constants          常量存放文件夹
|   ├── enums              枚举
|   ├── interfaces         接口存放
|   ├── models             dva 的 model
|   ├── pages              界面
|   ├── services           服务类文件夹
|   ├── styles             项目通用样式
|   ├── utils              工具类存放文件夹 
|   └── app.js             项目入口文件
└── package.json

| 目录           | 说明             | 用途                                                                                                               |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| src/components | 常规组件文件夹   | 存放项目组件文件夹：<br /> 要求：**只接受数据和回传数据，方便后续抽取到 私服包**                                   |
| src/config     | 配置存放文件夹   | 项目自定义配置信息：默认使用 default.config , build 的话会和 prod.config 做深拷贝，如有重复，**prod 替换 default** |
| src/constants  | 常量存放文件夹   | 存放常量                                                                                                           |
| src/enums      | 枚举             | 存放枚举                                                                                                           |
| src/interfaces | 接口存放         | 存放一些数据约定，或者一些重复的约定可以提取到当前文件夹                                                           |
| src/models     | dva 的 model     | [dvajs 使用说明](https://github.com/dvajs/dva-knowledgemap)<br /> [官方说明](https://dvajs.com/guide/)             |
| src/pages      | 界面             | 注意，新增界面需要去 app.tsx 手动新增所建界面路径：类似 小程序那样的操作                                           |
| src/services   | 服务类文件夹     | 针对后端提供的服务，和后台提供的 API 接口一一对应                                                                  |
| src/styles     | 项目通用样式     | app.scss 项目全局样式 mixin.scss 全局变量样式文件， theme.scss taro-ui 主题替换文件                                |
| src/utils      | 工具类存放文件夹 |                                                                                                                    |

### 开发流程  暂无mock 可以忽略mock部分

```tex
1:新增界面->2:修改 app.tsx 配置刚刚建立的界面路径 -> 3:开发界面(静态界面开发，组件抽取，代码分类等等) -> 4：对接口新增 services -> 5:配置mock地址对mock数据 -> 6: 后端接口开发完成把host切换为正常的地址 -> 7：后续都老司机大家都懂
```

### 项目内置命令

- 创建界面

```cmd
  yarn template p test  // test 为界面名称
```

- 创建服务

```cmd
  yarn template s test  // test 为服务名称
```

- 创建 model

```cmd
  yarn template m test  // test 为model名称
```

其他可以后续扩展，可以考虑抽取到私服包

### 格式要求

严格按照 Tslint 规范执行，

建议：

```cmd
1、使用 vscode IDE 开发工具
```

```cmd
2、vscode 安装 tslint 插件 和 prettier 插件，将减少大量的 tslint 检测问题
```

```cmd
3、除了配置文件，其他文件强烈建议使用 class 的方式编写代码
```


### 技术栈文档地址

- [taro](https://nervjs.github.io/taro/docs/README.html)
- [taro-ui](https://taro-ui.aotu.io/)
- [dvajs](https://dvajs.com/guide/)
- [typescript](https://www.tslang.cn/docs/handbook/basic-types.html)
- [scss](https://www.sass.hk/)