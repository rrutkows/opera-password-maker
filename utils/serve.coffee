connect = require "connect"
serveStatic = require "serve-static"

app = connect()

app.use "/js/lib", serveStatic "common/js"
app.use "/test", serveStatic "test"
app.use serveStatic "web"

app.listen 9753
