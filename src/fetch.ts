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
        if (this.kernel === jQuery) {
            this.kernel.__get = this.jQueryGetAdapter;
            this.kernel.__post = this.jQueryPostAdapter;
        } else if (this.kernel === axios) {
            this.kernel.__get = this.kernel.get;
            this.kernel.__post = this.kernel.post;
        }
    }

    /**
     * jquery post适配器
     * @param url 
     * @param config 
     */
    protected jQueryPostAdapter(url: string, config?: any) {
        console.log(1);
    }

    /**
     * jQuery get适配器
     * @param url 
     * @param data 
     * @param config 
     */
    protected jQueryGetAdapter(url: string, data?: any, config?: any) {
        console.log(2);
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