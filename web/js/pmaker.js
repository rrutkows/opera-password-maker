(function() {
    var form = document.forms["password-maker-form"],
        fields = form.elements,
        defaultPasswordLength = 10;
    
    function parsePasswordLength(sLength) {
        var passwordLength = parseInt(sLength);
        if (isNaN(passwordLength) || passwordLength < 3)
            passwordLength = defaultPasswordLength;
        return passwordLength;
    }
    
    if (window.localStorage) {
        fields["url"].value = localStorage["url"] || "";
        fields["password-length"].value = parsePasswordLength(localStorage["password-length"]);
    } else {
        fields["password-length"].value = defaultPasswordLength;
    }

    form.onsubmit = function() {
        var masterPassword = fields["master-password"].value,
            url = fields["url"].value,
            domainName = getDomainName(url),
            passwordLength = parsePasswordLength(fields["password-length"].value),
            password;

        fields["url"].value = domainName;
        fields["password-length"].value = passwordLength;
        if (window.localStorage) {
            localStorage["url"] = domainName;
            localStorage["password-length"] = passwordLength;
        }
        password = makePassword(masterPassword, domainName, passwordLength);
        fields["password"].value = password;
        return false;
    };
})();