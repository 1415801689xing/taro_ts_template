import BaseRequest from '~/utils/request';

/**
 * cnode请求服务类
 */
class TopicService extends BaseRequest {
	constructor() {
		// 指定host对象的Key，具体看 config文件
		super({ hostKey: 'topic' });
	}

	/**
	 * 获取数据
	 * @param page page Number 页数
	 * @param tab tab String 主题分类。目前有 ask share job good
	 * @param limit imit Number 每一页的主题数量
	 * @param mdrender mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
	 */
	public getData(page = 1, tab, limit = 10, mdrender = false): Promise<any> {
		return this.get('/api/v1/topics', { page, tab, limit, mdrender });
	}
}

export default new TopicService() as TopicService;
