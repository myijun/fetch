### 轻量封装jquery或者axios,各类项目开发中方便切换jQuery/axios使用

###### 生成以jQuery为内核的实例
```javascript
let instance = new fetch($,{
     timeout: 1000
});
```
###### 生成以axios为内核的实例
```javascript
let instance = new fetch(axios,{
     timeout: 1000
});
```
###### 使用实例GET,POST方法
```javascript
instance.get('url').then();
instance.post('url',{}).then();
```
###### 初始化实例当前支持配置参数
```typescript
interface IFetchConfig {
    headers?: Object,
    timeout?: number,
    responseType?: string,
    /**
     * 
     */
    xBefore?: Function,
    /**
     * 请求完成后最终执行参数
     */
    XComplete?: Function

}
```