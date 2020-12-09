import jQueryAdapter from "./jQuery/jQueryAdapter";

declare let jQuery;
declare let axios;

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
    constructor(kernel) {
        this.kernel = kernel;
        if (this.kernel === (jQuery ?? undefined)) {
            this.kernel = new jQueryAdapter(this.kernel);
            this.kernel.__get = this.kernel.jQueryGetAdapter;
            this.kernel.__post = this.kernel.jQueryPostAdapter;
        } else if (this.kernel === (axios ?? undefined)) {
            this.kernel.__get = this.kernel.get;
            this.kernel.__post = this.kernel.post;
        }
    }


    /**
     * 
     * @param url 
     * @param config 
     */
    public get(url: string, config?: any) {
        return this.kernel.__get.call(this.kernel, url, config);
    }

    /**
     * 
     * @param url 
     * @param data 
     * @param config 
     */
    public post(url: string, data?: any, config?: any) {
        return this.kernel.__post.call(this.kernel, url, data, config);;
    }


}