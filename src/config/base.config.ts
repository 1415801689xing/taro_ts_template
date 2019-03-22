import { defaultConfig } from '../config/default.config';
import { prodConfig } from '../config/prod.config';

/**
 * 配置文件
 */
let config: any = {};

// 如果是开发模式直接使用默认配置
if (process.env.NODE_ENV === 'development') {
	config = defaultConfig;
} else {
	// 如果是生产则合并，默认和生产，用生产的替换默认的配置
	config = { ...defaultConfig, ...prodConfig };
}
export { config };
