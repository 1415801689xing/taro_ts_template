import './index.scss';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import TabBarComponent from '~/components/tabBar';
import TopicService from '~/services/topic.service';
import { connect } from '@tarojs/redux';
import IPageDispatchProps from '~/interfaces/IPageDispatchProps';

// tslint:disable-next-line:completed-docs
interface IPageStateProps {}

/**
 * 界面属性定义
 */
interface IPageOwnProps {}

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
 * topic 首页
 */

@connect(({}) => ({}))
class Index extends Component {
	config: Config = {
		navigationBarTitleText: 'conde 常规版本',
		enablePullDownRefresh: true
	};

	state = {
		page: 1,
		tab: 'ask',
		current: 0,
		limit: 15,
		mdrender: false,
		topicList: []
	};

	/**
	 * getTopic
	 */
	async getTopic() {
		const result = await TopicService.getData(
			this.state.page,
			this.state.tab,
			this.state.limit,
			this.state.mdrender
		);
		let topicList = result.data;
		if (this.state.page !== 1) {
			topicList = this.state.topicList.concat(topicList);
		}
		this.setState(
			{
				topicList
			},
			() => {
				// state 设置成功回调
				// console.log(this.state.topicList);
			}
		);
	}
	/**
	 * 小程序下拉刷新
	 */
	onPullDownRefresh() {
		this.setState({ page: 1 }, () => {
			this.getTopic();
		});
	}
	/**
	 * 小程序上拉加载更多
	 */
	onReachBottom() {
		this.setState({ page: this.state.page + 1 }, () => {
			this.getTopic();
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
	/**
	 * 跳转到详情
	 * @param item 当前项目
	 */
	jumpDetail(item: any): any {
		// throw new Error('Method not implemented.');
		// console.log(this.context.store.dispatch);
		this.props.dispatch({
			type: 'topic/setShowDetail',
			payload: { topicDetail: item }
		});
		Taro.navigateTo({
			url: '/pages/topicDetail/index'
		});
	}
	// #region 生命周期，需要自行放开注释
	// componentWillReceiveProps(nextProps, nextContext) {}
	// componentWillUnmount() {}
	// componentDidHide() {}
	// componentDidCatchError() {}
	// componentDidNotFound() {}
	// #endregion

	/**
	 * render
	 */
	render() {
		return (
			<View className='topic-page'>
				<AtList>
					{this.state.topicList.map((item: any) => (
						<AtListItem
							onClick={e => this.jumpDetail(item)}
							key={item.id}
							title={item.title}
							extraText={item.content}
						/>
					))}
				</AtList>
				<view>
					<TabBarComponent current={this.state.current} />
				</view>
			</View>
		);
	}
}
export default Index;
