import './index.scss';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
// tslint:disable-next-line:no-implicit-dependencies
import { ComponentClass } from 'react';
import { connect } from '@tarojs/redux';
import dayjs from 'dayjs';

// #region 界面属性定义 不用Redux 的界面可以删掉

/**
 * redux状态属性定义
 */
interface IPageStateProps {
	topic: { topicDetail: any };
}

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
@connect(({ topic }) => ({
	topic
}))
class Index extends Component {
	config: Config = {
		navigationBarTitleText: ''
	};

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
			<View className='topicDetail-page'>
				<View className='at-article__h1'>
					{this.props.topic.topicDetail.title}
				</View>
				<View className='at-article__info'>
					{dayjs(this.props.topic.topicDetail.create_at).format(
						'YYYY-MM-DD HH:mm:ss'
					)}
					&nbsp;&nbsp;&nbsp;
					{this.props.topic.topicDetail.author.loginname}
				</View>
				<View className='at-article__content'>
					<View className='at-article__section'>
						<View className='at-article__p'>
							{this.props.topic.topicDetail.content}
						</View>
						<View className='at-article__p'>
							{dayjs(this.props.topic.topicDetail.last_reply_at).format(
								'YYYY-MM-DD HH:mm:ss'
							)}
						</View>
						<Image
							className='at-article__img'
							src={this.props.topic.topicDetail.author.avatar_url}
							mode='widthFix'
						/>
					</View>
				</View>
			</View>
		);
	}
}
export default Index as ComponentClass<IPageOwnProps, IPageState>;
