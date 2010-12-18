function getDomainName(url) {
    var host = /^.*:\/\/([^/]*)/.exec(url)[1];
    var labels = host.split(".");
    var top = labels[labels.length - 1];
    var tldNames = effectiveTLDNames[top] || ["*"],
        tldName,
        tldNameLabelCount,
        level = 1,
        isException;
    for (var i = 0, l = tldNames.length; i < l; i++) {
        tldName = tldNames[i];
        if (tldName.charAt(0) == "!") {
            isException = true;
            tldName = tldName.substr(1);
        }
        else
            isException = false;
        if (!tldNameMatches(tldName, labels))
            continue;
        tldNameLabelCount = tldName.split(".").length;
        if (isException)
            return createDomainName(labels, tldNameLabelCount);
        if (tldNameLabelCount + 1 > level)
            level = tldNameLabelCount + 1;
    }
    return createDomainName(labels, level);
}

function tldNameMatches(tldName, labels) {
    var tldNameLabels = tldName.split("."),
        tldNameLabel;
    if (labels.length < tldNameLabels.length)
        return false;
    for (var i = 0, l = tldNameLabels.length; i < l; i++) {
        tldNameLabel = tldNameLabels[l - i - 1];
        if (tldNameLabel != "*" && tldNameLabel != labels[labels.length - i - 1])
            return false;
    }
    return true;
}

function createDomainName(labels, level) {
    level = Math.min(labels.length, level);
    return labels.slice(labels.length - level).join(".");
}

function makePassword(masterPassword, domain, length) {
    var password = masterPassword + ":" + domain;

    password = unescape(encodeURIComponent(password));
    
    for (var i = 0; i < 10 || !checkPassword(password, length); i++)
        password = b64_md5_sgp(password);
        
    return password.substr(0, length);
}

function checkPassword(password, length) {
    password = password.substr(0, length);
    return (password.search(/[a-z]/)===0&&password.search(/[0-9]/)>0&&password.search(/[A-Z]/)>0)?true:false;
}
