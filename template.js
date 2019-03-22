/**
 * pages模版快速生成脚本,执行命令 npm run template p `文件名`
 * models模版快速生成脚本,执行命令 npm run template m `文件名`
 * services模版快速生成脚本,执行命令 npm run template s `文件名`
 */

const fs = require('fs');

const typeArray = ['m', 's', 'p'];

const type = process.argv[2];
const dirName = process.argv[3];
console.log(process.argv);

function exampleTips() {
	console.log('命令使用例子：');
	console.log('示例1：npm run template p test');
	console.log('示例2：npm run template m test');
	console.log('示例3：npm run template s test');
}

if (!type || typeArray.indexOf(type) < 0) {
	console.log("操作类型只能是：['m', 's', 'p']");
	exampleTips();
	process.exit(0);
}

if (!dirName) {
	console.log('文件夹名称不能为空！');
	exampleTips();
	process.exit(0);
}

// #region 页面模板

// 页面模版
const indexTep = `import './index.scss';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
// tslint:disable-next-line:no-implicit-dependencies
import { ComponentClass } from 'react';

// #region 界面属性定义 不用Redux 的界面可以删掉

/**
 * IPageStateProps
 */
interface IPageStateProps {}

/**
 * 定义dispatch
 */
interface IPageDispatchProps {
	dispatch: (arg0: any) => any;
}

/**
 * 界面属性定义
 */
interface IPageOwnProps {}

/**
 * 界面状态定义
 */
interface IPageState {}

/**
 * IProps
 */
type IProps = IPageStateProps & IPageDispatchProps & IPageOwnProps;

/**
 * Index
 */
interface Index {
	props: IProps;
}
// #region

/**
 * 界面
 */
class Index extends Component {
	config: Config = {
		navigationBarTitleText: ''
	};

	state: IPageState = {};

	// #region 生命周期需要自行放开注释
	// /**
	//  * 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 app 的 onLaunch
	//  */
	// componentWillMount() {}

	// /**
	//  * 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 app 的 onLaunch，在 componentWillMount 后执行
	//  */
	// componentDidMount() {}

	// /**
	//  * 已经装载的组件接收到新属性前调用
	//  */
	// componentWillReceiveProps(nextProps, nextContext) {}
	// /**
	//  * 组件卸载时触发
	//  */
	// componentWillUnmount() {}

	// /**
	//  * 页面显示/切入前台时触发
	//  */
	// componentDidShow() {}

	// /**
	//  *页面隐藏/切入后台时触发， 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等
	//  */
	// componentDidHide() {}

	// /**
	//  * 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 onError，H5/RN 中尚未实现
	//  */
	// componentDidCatchError() {}

	// /**
	//  * 在微信/字节跳动小程序中这一生命周期方法对应 onPageNotFound，其他端尚未实现
	//  */
	// componentDidNotFound() {}
	// #endregion

	/**
	 * render 函数
	 */
	render() {
		return (
			<View className='${dirName}-page'>
				<view>page</view>
			</View>
		);
	}
}
export default Index as ComponentClass<IPageOwnProps, IPageState>;

`;
// #endregion

// scss文件模版
const scssTep = `@import "../../styles/mixin";

.${dirName}-page {
  @include wh(100%, 100%);
}
`;

// model文件模版 import TopicService from '../services/topic.service';
const modelTep = `import  ${dirName}Service from '../services/${dirName}.service';

export default {
  namespace: '${dirName}',
  state: {

  },

  effects: {
    * effectsDemo({ payload }, { call, put, select }) {
      const { status, data } = yield call(${dirName}Api.demo, {});
      if (status === 'ok') {
        yield put({ type: 'save',
          payload: {
            topData: data,
          } });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
`;

// service页面模版
const serviceTep = `
import BaseRequest from '../utils/request';

class ${dirName}Service extends BaseRequest {
	constructor() {
		super();
	}
	public getData(data): Promise<any> {
		return this.get('url', data);
	}
}

export default new ${dirName}Service();

`;
const pagePath = `./src/pages/${dirName}`;
const servicePath = `./src/services/${dirName}.service.ts`;
const modelPath = `./src/models/${dirName}.ts`;

switch (type) {
	case 'p':
		const isExistPagePath = fs.existsSync(pagePath);
		if (isExistPagePath) {
			console.log('该文件已经存在！！');
			process.exit(0);
		}
		fs.mkdirSync(`${pagePath}`);
		fs.writeFileSync(`${pagePath}/index.tsx`, indexTep);
		fs.writeFileSync(`${pagePath}/index.scss`, scssTep);
		break;
	case 's':
		const isExistServicePath = fs.existsSync(servicePath);
		if (isExistServicePath) {
			console.log('该文件已经存在！！');
			process.exit(0);
		}
		fs.writeFileSync(`${servicePath}`, serviceTep);
		break;
	case 'm':
		const isExistModelPath = fs.existsSync(modelPath);
		if (isExistModelPath) {
			console.log('该文件已经存在！！');
			process.exit(0);
		}
		fs.writeFileSync(`${modelPath}`, modelTep);
		break;
}
console.log('文件创建成功！！！');
process.exit(0);
