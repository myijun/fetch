import { IFetchConfig } from "../fetch";
import { suffixURI } from "./commons";


export default class axiosAdapter {
    /**
     * 进行ajax请求使用的kin
     */
    protected kernel;
    /**
     * 
     * @param kernel 处理核心
     */
    constructor(kernel, config: IFetchConfig) {
        this.kernel = kernel;
        if (config) {
            this.kernel(config);
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