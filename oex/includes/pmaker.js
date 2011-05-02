window.addEventListener("load", function() {
    opera.extension.addEventListener("message", function(e) {
        var password = e.data.password;
        if (!password)
            return;
        fillForms(document, password);
    }, false);
    
    function fillForms(doc, password)
    {
        var passwordFields = doc.querySelectorAll('input[type="password"]'),
            passwordField;
        for (var i = 0; passwordField = passwordFields[i]; i++)
            passwordField.value = password;
            
        processFrames(doc, password);
    }
    
    function processFrames(doc, password)
    {
        var frames = doc.querySelectorAll('frame,iframe'),
            frame,
            frameDoc;
        for (var i = 0; frame = frames[i]; i++)
        {
            try
            {
                frameDoc = frame.contentDocument;
                if (frameDoc)
                    fillForms(frameDoc, password);
            }
            catch(e)
            {
                continue;
            }
        }
    }
}, false);
