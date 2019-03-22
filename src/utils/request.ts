import Taro from '@tarojs/taro';
import { config } from '../config/base.config';
import { HTTP_ERROR } from '~/constants/httpStatus';

/**
 * 请求基类自定义配置
 */
interface IOptios {
	hostKey: string;
	[key: string]: any;
}

/**
 * 请求基类
 */
class BaseRequest {
	public optios?: IOptios;

	constructor(optios?: IOptios) {
		this.optios = optios;
	}

	/**
	 * Taro 默认请求
	 * @param {*} config
	 */
	public async request({
		url, // String	是		开发者服务器接口地址
		data, // Object/String/ArrayBuffer	否		请求的参数
		header = null, // 	Object	否		设置请求的 header，header 中不能设置 Referer。
		method, // String	否	GET	（需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
		dataType = 'json', // String	否	json	如果设为 json，会尝试对返回的数据做一次 JSON.parse
		responseType = 'text' // String	否	text	设置响应的数据类型。合法值：text、arraybuffer
	}) {
		// 获取请求host 通过service super指定
		const hostKey = this.optios ? this.optios.hostKey : '';
		if (!hostKey) {
			throw new Error('请指定服务key');
		}
		const baseHostObj = config[hostKey];

		return Taro.request({
			url: `${baseHostObj.url}${url}`,
			data,
			header,
			method,
			dataType,
			responseType
		})
			.then(rs => {
				return Promise.resolve(rs.data);
			})
			.catch(error => {
				console.log(error);
				Taro.showToast({
					title: HTTP_ERROR[error.httpStatus]
				});
				return Promise.reject(error);
			});
	}

	/**
	 * get发送请求
	 * @param {*} url
	 * @param {*} data
	 */
	public get(url, data?: any, header = null) {
		return this.request({ url, data, method: 'GET', header });
	}

	/**
	 * post请求
	 * @param {*} url
	 * @param {*} data
	 */
	public post(url, data = null) {
		return this.request({ url, data, method: 'POST' });
	}

	/**
	 * put请求
	 * @param {*} url
	 * @param {*} data
	 */
	public put(url, data = null) {
		return this.request({ url, data, method: 'PUT' });
	}

	/**
	 * DELETE请求
	 * @param {*} url
	 * @param {*} data
	 */
	public delete(url, data = null) {
		return this.request({ url, data, method: 'DELETE' });
	}
}

export default BaseRequest;
