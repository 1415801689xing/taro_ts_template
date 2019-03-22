import TopicService from '~/services/topic.service';

export default {
	namespace: 'topic',
	state: { topicList: [], topicDetail: null },

	effects: {
		*getData({ payload }, { call, put, select }) {
			const { page = 1, tab = 'ask', limit = 15, mdrender } = payload;
			const { data, success } = yield call(
				// 特别注意调用class的method 时候要绑定 当前对象，否则应为yield的问题，导致this指向错乱
				TopicService.getData.bind(TopicService),
				page,
				tab,
				limit,
				mdrender
			);

			if (success) {
				yield put({
					type: 'save',
					payload: {
						topicList: data,
						page
					}
				});
			}
			return data;
		}
	},

	reducers: {
		save(state, { payload }) {
			const { page, topicList } = payload;
			let list = [];
			if (page !== 1) {
				list = state.topicList.concat(topicList);
			} else {
				list = topicList;
			}
			return {
				...state,
				...{
					topicList: list
				}
			};
		},
		setShowDetail(state, { payload }) {
			const { topicDetail } = payload;
			return {
				...state,
				...{
					topicDetail
				}
			};
		}
	}
};
