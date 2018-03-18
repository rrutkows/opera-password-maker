import effectiveTldNames from './effectiveTLDNames';
import UrlParser from './urlParser';
import { sha512Sgp, md5Sgp } from './sgp.js';

export const urlParser = new UrlParser(effectiveTldNames);
export const algorithms = [
    { key: 'sgp_sha512', value: sha512Sgp },
    { key: 'sgp_md5', value: md5Sgp }
];
