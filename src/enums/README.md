枚举存放文件

```js
/**
 * 状态枚举
 */
export enum processStatus {
	'提交' = 1,
	'驳回',
	'审批同意',
	'正在审批'
}
// 小技巧 如:直接使用 processStatus[2] => 驳回 直接反取中文名
```
