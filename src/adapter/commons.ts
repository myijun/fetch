export function suffixURI(url: string) {
    url += (url.indexOf('?') > -1 ? "&" : "?");
    url += ('_t=' + new Date().getTime());
    return url;
}