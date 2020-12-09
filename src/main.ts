declare let $;
declare let axios;
import fetch from './fetch';

window['a'] = fetch;

let jqueryTest, axiosTest;
window['jqueryTest'] = jqueryTest = new fetch($, {
    timeout: 1000,
    headers: { 'X-Requested-With-t': 'XMLHttpRequest' }
});
// window['axiosTest'] = axiosTest = new fetch(axios, {
//     timeout: 1000,
//     headers: { 'X-Requested-With-t': 'XMLHttpRequest' }
// });

jqueryTest.get('../assets/test.json');
axiosTest.get('../assets/test.json');