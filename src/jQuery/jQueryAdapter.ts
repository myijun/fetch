interface IConfig {
    url: string
    data?: any,
    event?: HTMLElement,
    headers?: any
    type?: 'POST' | 'GET',
    dataType?: 'xml' | 'html' | 'script' | 'json' | 'jsonp' | 'text',
    contentType?: 'application/x-www-form-urlencoded' | false,
    processData?: boolean,
    mimeType?: 'multipart/form-data',
    success?: Function,
    error?: Function,
    complete?: Function
}
let defaultAjaxConfig: IConfig = {
    url: '',
    type: 'POST',
    dataType: 'json',
    success: undefined,
    error: undefined,
    complete: undefined
}
/**
 * 
 */
export default class jQueryAdapter {

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
    }

    /**
        * jquery post适配器
        * @param url 
        * @param config 
        */
    public jQueryPostAdapter(url: string, config?: any) {
        return this.ajax({
            url: url,
            type: 'GET'
        })
    }

    /**
     * jQuery get适配器
     * @param url 
     * @param data 
     * @param config 
     */
    public jQueryGetAdapter(url: string, data?: any, config?: any) {
        return this.ajax({
            url: url,
            type: "POST"
        });
    }

    /**
     * Ajax进行访问
     * @param config 
     */
    protected ajax(config: IConfig): Promise<any> {
        let that = this;
        return new Promise(function (resolve, reject) {
            config = Object.assign(defaultAjaxConfig, config);
            config.url += (config.url.indexOf('?') > -1 ? "&" : "?");
            config.url += ('_t=' + new Date().getTime());
            config.success = function (response) {
                resolve(response);
            }
            config.error = function (response) {
                reject(response);
            }
            that.kernel.ajax(config);
        });
    }


}