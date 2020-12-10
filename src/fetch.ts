import axiosAdapter from "./adapter/axiosAdapter";
import jQueryAdapter from "./adapter/jQueryAdapter";

declare let jQuery;
declare let axios;

export interface IFetchConfig {
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
/**
 * 
 */
export default class fetch {

    /**
     * 进行ajax请求使用的kin
     */
    protected kernel;

    /**
     * 
     * @param kernel 处理核心
     */
    constructor(kernel, config?: IFetchConfig) {
        this.kernel = kernel;
        if (this.kernel === (jQuery ?? undefined)) {
            this.kernel = new jQueryAdapter(this.kernel, config);
            this.kernel.__get = this.kernel.getAdapter;
            this.kernel.__post = this.kernel.postAdapter;
        } else if (this.kernel === (axios ?? undefined)) {
            this.kernel = new axiosAdapter(this.kernel, config);
            this.kernel.__get = this.kernel.getAdapter;
            this.kernel.__post = this.kernel.postAdapter;
        }
    }


    /**
     * 
     * @param url 
     * @param config 
     */
    public get(url: string, config?: any): Promise<any> {
        return this.kernel.__get.call(this.kernel, url, config);
    }

    /**
     * 
     * @param url 
     * @param data 
     * @param config 
     */
    public post(url: string, data?: any, config?: any): Promise<any> {
        return this.kernel.__post.call(this.kernel, url, data, config);;
    }


}