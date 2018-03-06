import md5 from 'crypto-js/md5';
import base64 from 'crypto-js/enc-base64';

function makePassword(masterPassword, domain, length) {
    var password = masterPassword + ':' + domain;

    for (var i = 0; i < 10 || !checkPassword(password, length); i++) {
        password = md5(password).toString(base64)
            .replace(/\+/g, '9')
            .replace(/\//g, '8')
            .replace(/=/g, 'A');
    }

    return password.substr(0, length);
}

function checkPassword(password, length) {
    password = password.substr(0, length);
    return password.search(/[a-z]/) === 0 && password.search(/[0-9]/) > 0 && password.search(/[A-Z]/) > 0;
}

export { makePassword };
