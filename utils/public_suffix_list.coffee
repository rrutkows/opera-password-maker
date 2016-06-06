fs = require 'fs'
byline = require 'byline'
path = require 'path'
write = process.stdout.write.bind process.stdout

dict = {}
list = []

process.stdout.on 'error', (error) ->
    process.exit 0 if error.code is 'EPIPE'

byline fs.createReadStream path.resolve(__dirname, 'public_suffix_list.dat'),
    autoClose: true
    encoding: 'utf8'
.on 'readable', ->
    while line=@read()
        continue if line.indexOf('//') is 0
        fragments = line.split '.'
        key = fragments[fragments.length - 1]
        unless dict[key]?
            dict[key] = []
            list.push key
        dict[key].push line
.on 'end', ->
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
