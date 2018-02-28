import effectiveTLDNames from './effectiveTLDNames';
import md5 from 'crypto-js/md5';
import base64 from 'crypto-js/enc-base64';

function getDomainName(url) {
    var host = /^(?:[^:]*:\/\/)?([^/:?]*)/.exec(url)[1];
    host = host.toLowerCase();
    var labels = host.split('.');
    var top = labels[labels.length - 1];
    var tldNames = effectiveTLDNames[top] || ['*'];
    var tldName,
        tldNameLabelCount,
        level,
        isException;
    level = 1;
    for (var i = 0, l = tldNames.length; i < l; i++) {
        tldName = tldNames[i];
        if (tldName.charAt(0) === '!') {
            isException = true;
            tldName = tldName.substr(1);
        } else {
            isException = false;
        }
        if (!tldNameMatches(tldName, labels)) {
            continue;
        }
        tldNameLabelCount = tldName.split('.').length;
        if (isException) {
            return createDomainName(labels, tldNameLabelCount);
        }
        if (tldNameLabelCount + 1 > level) {
            level = tldNameLabelCount + 1;
        }
    }
    return createDomainName(labels, level);
}

function tldNameMatches(tldName, labels) {
    var tldNameLabels = tldName.split('.');
    var tldNameLabel;
    if (labels.length < tldNameLabels.length) {
        return false;
    }
    for (var i = 0, l = tldNameLabels.length; i < l; i++) {
        tldNameLabel = tldNameLabels[l - i - 1];
        if (tldNameLabel !== '*' && tldNameLabel !== labels[labels.length - i - 1]) {
            return false;
        }
    }
    return true;
}

function createDomainName(labels, level) {
    level = Math.min(labels.length, level);
    return labels.slice(labels.length - level).join('.');
}

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

export { getDomainName, makePassword };
