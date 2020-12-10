import { IFetchConfig } from "../fetch";
import { suffixURI } from "./commons";


export default class axiosAdapter {
    /**
     * 进行ajax请求使用的kin
     */
    protected kernel;

    /**
     * 
     */
    protected config: IFetchConfig;
    /**
     * 
     * @param kernel 处理核心
     */
    constructor(kernel, config: IFetchConfig) {
        this.kernel = kernel.create(config);
        this.config = config;
        let that = this;
        if (config.xBefore) {
            this.kernel.interceptors.request.use(config => {
                that.config.xBefore.call(that.kernel, config);
            }, error => {
                return Promise.reject(error);
            });
        }
        if (config.XComplete) {
            this.kernel.interceptors.response.use(response => {
                that.config.XComplete.call(that.kernel, response);
            }, error => {
                return Promise.reject(error);
            });
        }
    }

    /**
     * 
     * @param url 
     * @param data 
     * @param config 
     */
    public postAdapter(url: string, data?: any, config?: any) {
        url = suffixURI(url);
        return this.kernel.post(url, data, config);
    }

    /**
     * 
     * @param url 
     * @param config 
     */
    public getAdapter(url: string, config?: any) {
        url = suffixURI(url);
        return this.kernel.get(url, config);
    }

}