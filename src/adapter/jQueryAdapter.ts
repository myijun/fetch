import { IFetchConfig } from "../fetch";
import { suffixURI } from "./commons";

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
    beforeSend?: Function
    timeout?: Number
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

    protected config: IFetchConfig;

    /**
     * 
     * @param kernel 处理核心
     */
    constructor(kernel, config: IFetchConfig) {
        this.kernel = kernel;
        this.config = config;
    }

    /**
        * jquery post适配器
        * @param url 
        * @param config 
        */
    public getAdapter(url: string, config?: any) {
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
    public postAdapter(url: string, data?: any, config?: any) {
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
            config.url = suffixURI(config.url);
            config.success = function (response) {
                resolve(response);
            }

            if (that.config.headers) {
                let _beforeSend = config.beforeSend ?? undefined;
                config.beforeSend = function (request) {
                    for (let key in that.config.headers) {
                        request.setRequestHeader(key, that.config.headers[key]);
                    }
                    _beforeSend && _beforeSend.call(this, request);
                };
            }
            that.config.timeout && (config.timeout = that.config.timeout);
            config.error = function (response) {
                reject(response);
            }

            that.kernel.ajax(config);
        });
    }


}