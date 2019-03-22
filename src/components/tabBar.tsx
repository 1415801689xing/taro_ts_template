import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtTabBar } from 'taro-ui';

/**
 * 组件需要的Props定义
 */
interface IProps {
	current: number;
}

/**
 * TabBarComponent
 */
class TabBarComponent extends Component<IProps, {}> {
	/**
	 * 跳转
	 */
	jumpTopic(e) {
		Taro.redirectTo({
			url: `/pages/index/index?current=${e}`
		});
	}
	/**
	 * 跳转
	 */
	jumpTopic1(e) {
		Taro.redirectTo({
			url: `/pages/topic/index?current=${e}`
		});
	}
	/**
	 * 跳转
	 */
	jumpTopic2(e) {
		Taro.redirectTo({
			url: `/pages/topic1/index?current=${e}`
		});
	}
	handleClick = e => {
		console.log(e);
		switch (+e) {
			case 0:
				this.jumpTopic(e);
				break;
			case 1:
				this.jumpTopic1(e);
				break;
			case 2:
				this.jumpTopic2(e);
				break;
			case 3:
				Taro.redirectTo({
					url: '/pages/payTest/index'
				});
				break;
		}
	};

	/**
	 * render
	 */
	render() {
		return (
			<View>
				<AtTabBar
					fixed
					tabList={[
						{ title: '首页', iconType: 'home' },
						{ title: '常规例子', iconType: 'list' },
						{ title: 'Redux例子', iconType: 'list' },
						{ title: '支付测试', iconType: 'bell' }
					]}
					onClick={this.handleClick.bind(this)}
					current={+this.props.current}
				/>
			</View>
		);
	}
}

export default TabBarComponent;
