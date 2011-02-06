window.addEventListener("load", function() {
    var form = document.getElementById("form"),
        background;
    
    opera.extension.addEventListener("message", function(e) {
        form[1].value = e.data.domainName;
        background = e.source;
    }, false);
    
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        var password = form[0].value,
            domainName = form[1].value;
        if (background) {
            background.postMessage({
                masterPassword: password,
                domainName: domainName
            });
        }
        window.close();
    }, false);
}, false);

