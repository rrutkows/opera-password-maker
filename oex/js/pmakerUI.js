window.addEventListener("load", function() {
    var properties = {
        title: texts.tooltip,
        disabled: !opera.extension.tabs.getFocused(),
        popup: {
            href: "popup.html"
        }
    };
    var toolbar = opera.contexts.toolbar;
    var button = toolbar.createItem(properties);
    toolbar.addItem(button);
    
    opera.extension.addEventListener("connect", function(e) {
        if (/^widget:/.test(e.origin)) {
            var tab = opera.extension.tabs.getFocused();
            if (tab) {
                var domainName = getDomainName(tab.url);
                e.source.postMessage({domainName: domainName});
            }
        } else {
            enableDisableButton();
        }
    }, false);

    opera.extension.addEventListener("message", function(e) {
        var masterPassword = e.data.masterPassword,
            domainName = e.data.domainName,
            tab = opera.extension.tabs.getFocused();
        
        if (masterPassword && domainName && tab) {
            var password = makePassword(masterPassword, domainName, 10);
            tab.postMessage({password: password});
        }
    }, false);
    
    opera.extension.tabs.addEventListener("focus", enableDisableButton, false);
    opera.extension.tabs.addEventListener("blur", enableDisableButton, false);
    
    function enableDisableButton() {
        button.disabled = !opera.extension.tabs.getFocused();
    }
}, false);


