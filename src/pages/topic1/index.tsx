import './index.scss';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
// tslint:disable-next-line:no-implicit-dependencies
import { ComponentClass } from 'react';
import { AtList, AtListItem } from 'taro-ui';
import { connect } from '@tarojs/redux';
import TabBarComponent from '../../components/tabBar';
import IPageDispatchProps from '~/interfaces/IPageDispatchProps';

// #region 界面属性定义 不用Redux 的界面可以删掉

/**
 * IPageStateProps
 */
interface IPageStateProps {
	topic: { topicList: Array<any> };
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
 * topic 首页
 */
@connect(({ topic }) => ({
	topic
}))
class Index extends Component {
	config: Config = {
		navigationBarTitleText: 'cnode Redux版本'
		// enabledownRefresh: true
	};

	state = {
		current: 0,
		page: 1,
		tab: 'ask',
		limit: 15,
		mdrender: false
	};

	/**
	 * 获取topic列表
	 */
	getTopic() {
		Taro.showLoading({
			title: 'loading'
		});
		this.props
			.dispatch({
				type: 'topic/getData',
				payload: {
					page: this.state.page,
					tab: this.state.tab,
					limit: this.state.limit,
					mdrender: this.state.mdrender
				}
			})
			.then(rs => {
				// console.log(rs);
				Taro.hideLoading();
			});
	}
	/**
	 * 下拉刷新 小程序 H5都支持
	 */
	downRefresh() {
		console.log('下拉刷新 小程序 H5都支持');
		this.setState({ page: 1 }, () => {
			this.getTopic();
		});
	}
	/**
	 * 上拉加载更多 小程序 H5都支持
	 */
	bottomRefresh() {
		console.log('上拉加载更多 小程序 H5都支持');
		this.setState({ page: this.state.page + 1 }, () => {
			this.getTopic();
		});
	}

	/**
	 * 跳转到详情
	 * @param item 当前项目
	 */
	jumpDetail(item: any): any {
		// throw new Error('Method not implemented.');
		this.props.dispatch({
			type: 'topic/setShowDetail',
			payload: { topicDetail: item }
		});
		Taro.navigateTo({
			url: '/pages/topicDetail/index'
		});
	}

	/**
	 * 界面显示时候
	 */
	componentDidShow() {
		const { current } = this.$router.params;
		this.setState({ current: +current || 0 });
		this.getTopic();
	}

	// #region 生命周期，需要自行放开注释
	// componentWillReceiveProps(nextProps, nextContext) {}
	// componentWillUnmount() {}
	// componentDidHide() {}
	// componentDidCatchError() {}
	// componentDidNotFound() {}
	// #endregion

	/**
	 * render 函数
	 */
	render() {
		return (
			<View className='topic-page'>
				<ScrollView
					scrollY
					scrollTop={-10}
					style={{ height: Taro.pxTransform(1500) }}
					lowerThreshold={120}
					upperThreshold={0}
					onScrollToLower={this.bottomRefresh.bind(this)}
					// onScrollToUpper={this.downRefresh.bind(this)}
				>
					<AtList>
						{this.props.topic.topicList.map((item: any, index) => (
							<AtListItem
								onClick={e => this.jumpDetail(item)}
								key={index}
								title={item.title}
								// note={item.content}
								arrow='right'
								thumb={item.author.avatar_url}
							/>
						))}
					</AtList>
				</ScrollView>

				<view>
					<TabBarComponent current={this.state.current} />
				</view>
			</View>
		);
	}
}
export default Index as ComponentClass<IPageOwnProps, IPageState>;
