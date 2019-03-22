import './index.scss';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
// tslint:disable-next-line:no-implicit-dependencies
import { ComponentClass } from 'react';
import { AtButton } from 'taro-ui';
import PayUtil from '~/utils/pay.util';

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
	 * 去支付
	 */
	goPay(payInfo) {
		const env = Taro.getEnv();
		// 支付宝
		if (env === Taro.ENV_TYPE.ALIPAY) {
			// 微信小程序支付
		}
		// 微信小程序环境
		if (env === Taro.ENV_TYPE.WEAPP) {
			// 微信小程序支付
			const weappPayResult = Taro.requestPayment({
				timeStamp: payInfo.timestamp,
				nonceStr: payInfo.nonceStr,
				package: payInfo.package,
				signType: payInfo.signType,
				paySign: payInfo.paySign
			});
			console.log(weappPayResult);
		}
		// WEB(H5)环境
		if (env === Taro.ENV_TYPE.WEB) {
			// 获取支付信息
			location.href = payInfo;
		}
	}
	/**
	 * render 函数
	 */
	render() {
		return (
			<View className='payTest-page'>
				<AtButton
					type='primary'
					onClick={e => {
						this.goPay('https://qr.alipay.com/bax04941iijolnbzt91e40e5');
					}}
				>
					支付宝支付
				</AtButton>
				<AtButton
					type='secondary'
					onClick={e => {
						this.goPay({
							appId: 'wxb1da929d81930a41',
							nonceStr: '5c8f028f21779',
							package: 'prepay_id=wx1810300382668370535c7b6b0528064876',
							paySign: '6D8F6ADD12D9848A4EB55EE831C62842',
							signType: 'MD5',
							timestamp: '1552876175'
						});
					}}
				>
					微信小程序支付
				</AtButton>
				<AtButton type='secondary'>微信里面打开地址支付</AtButton>
			</View>
		);
	}
}
export default Index as ComponentClass<IPageOwnProps, IPageState>;
