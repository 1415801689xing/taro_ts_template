export default {
	namespace: 'count',
	state: { number: 1 },
	effects: {
		*decAsync({ payload }, { call, put, select }) {
			const result = yield new Promise(resolve => {
				setTimeout(() => {
					resolve(true);
				}, 1000);
			});
			console.log(result);
			if (result) {
				yield put({
					type: 'change',
					payload: { type: 'dec' }
				});
			}
		}
	},
	reducers: {
		change(state, { payload }) {
			const { type } = payload;
			// tslint:disable-next-line:variable-name
			let number = state.number;
			switch (type) {
				case 'add':
					number++;
					break;
				case 'dec':
					number--;
					break;
			}
			return { ...state, ...{ number } };
		}
	}
};
