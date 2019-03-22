// tslint:disable-next-line:no-implicit-dependencies
import { ComponentClass } from 'react';
import Taro, { Component, Config, ENV_TYPE } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';
import TabBarComponent from '~/components/tabBar';

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

/**
 * IPageStateProps
 */
interface IPageStateProps {
	count: {
		number: number;
	};
}
/**
 * IPageDispatchProps
 */
interface IPageDispatchProps {
	dispatch: (arg0: any) => any;
}
/**
 * IPageOwnProps
 */
// tslint:disable-next-line:no-empty-interface
interface IPageOwnProps {}
/**
 * IPageState
 */
interface IPageState {
	current: number;
}
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

/**
 * 注入redux状态
 */
@connect(({ count }) => {
	return {
		count
	};
})
class Index extends Component {
	/**
	 * 指定config的类型声明为: Taro.Config
	 *
	 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
	 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
	 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
	 */
	config: Config = {
		navigationBarTitleText: '首页'
	};

	state: IPageState = {
		current: 0
	};

	/**
	 * 触发改变
	 */
	handleChange = type => {
		console.log(ENV_TYPE.WEAPP);
		this.props.dispatch({
			type: 'count/change',
			payload: { type }
		});
	};
	/**
	 * 异步改变
	 */
	handleChangeDesAsync = () => {
		this.props.dispatch({
			type: 'count/decAsync'
		});
	};
	// #region 生命周期需要自行放开注释
	// componentWillMount() {}
	// componentDidMount() {}
	// componentWillReceiveProps(nextProps, nextContext) {}
	// componentWillUnmount() {}
	// componentDidShow() {}
	// componentDidHide() {}
	// componentDidCatchError() {}
	// componentDidNotFound() {}
	// #endregion

	/**
	 * render
	 */
	render() {
		return (
			<View className='index'>
				<Button
					className='add_btn'
					onClick={() => {
						this.handleChange('add');
					}}
				>
					+
				</Button>
				<Button
					className='dec_btn'
					onClick={e => {
						this.handleChange('dec');
					}}
				>
					-
				</Button>
				<Button
					className='dec_btn'
					onClick={e => {
						this.handleChangeDesAsync();
					}}
				>
					async
				</Button>
				<View>
					<Text>{this.props.count.number}</Text>
				</View>
				<view>
					<TabBarComponent current={this.state.current} />
				</view>
			</View>
		);
	}
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<IPageOwnProps, IPageState>;
