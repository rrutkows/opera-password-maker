window.addEventListener("load", function() {
    opera.extension.addEventListener("message", function(e) {
        var password = e.data.password;
        if (!password)
            return;
        var passwordFields = document.querySelectorAll('input[type="password"]'),
            passwordField;
        for (var i = 0; passwordField = passwordFields[i]; i++)
            passwordField.value = password;
    }, false);
}, false);
