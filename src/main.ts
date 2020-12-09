declare let $;
declare let axios;
import fetch from './fetch';

window['a'] = fetch;

let jqueryTest, axiosTest;
window['jqueryTest'] = jqueryTest = new fetch($);
window['axiosTest'] = axiosTest = new fetch(axios);

jqueryTest.get('../assets/test.json');
axiosTest.get('../assets/test.json');