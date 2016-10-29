fs = require 'fs'
readline = require 'readline'
path = require 'path'
write = process.stdout.write.bind process.stdout

dict = {}
list = []

process.stdout.on 'error', (error) ->
    process.exit 0 if error.code is 'EPIPE'

readline.createInterface
    input: fs.createReadStream path.resolve(__dirname, 'public_suffix_list.dat'),
        autoClose: true
        encoding: 'utf8'
.on 'line', (line) ->
    return if not line or line.indexOf('//') is 0
    fragments = line.split '.'
    key = fragments[fragments.length - 1]
    unless dict[key]?
        dict[key] = []
        list.push key
    dict[key].push line
.on 'close', ->
    list.sort()
    write 'var effectiveTLDNames = {'
    for key, i in list
        write ',' if i > 0
        write "\n \"#{key}\": ["
        for line, j in dict[key]
            write ',' if j > 0
            write "\n    \"#{line}\""
        write ']'
    write '\n};'
