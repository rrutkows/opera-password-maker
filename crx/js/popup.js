import { makePassword } from 'pmaker-lib/pmaker';
import effectiveTLDNames from 'pmaker-lib/effectiveTLDNames';
import UrlParser from 'pmaker-lib/urlParser';

const urlParser = new UrlParser(effectiveTLDNames);

window.addEventListener('load', function() {
    function getActiveTab(callback) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            if (tabs.length > 0) {
                callback(tabs[0]);
            }
        });
    }

    var form = document.getElementById('form');

    form.elements['generatePasswordButton'].value =
        chrome.i18n.getMessage('generate_password');

    getActiveTab(function(tab) {
        form.elements['domainName'].value = urlParser.getDomainName(tab.url);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var masterPassword = form.elements['masterPassword'].value;
        var domainName = form.elements['domainName'].value;
        var password = makePassword(masterPassword, domainName, 10);

        getActiveTab(function(tab) {
            chrome.tabs.sendMessage(tab.id, {password: password});
            window.close();
        });
    }, false);
}, false);
