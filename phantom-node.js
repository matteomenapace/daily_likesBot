var phantomjs = require('phantomjs-prebuilt')
var program = phantomjs.exec('phantom.js', 'cloudscape')
program.stdout.pipe(process.stdout)
program.stderr.pipe(process.stderr)