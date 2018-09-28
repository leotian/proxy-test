const http = require('http')
const https = require('https')
const httpProxy = require('http-proxy')
const url = require('url')

const PROXY_PORT = 8080

// Create a proxy server with custom application logic
const proxy = httpProxy.createProxy({})

proxy.on('error', function (err) {
  console.log('ERROR')
  console.log(err)
})

const server = http.createServer(function (req, res) {
  //const finalUrl = req.url,
  const finalUrl = 'https://www.sogou.com/'
  let finalAgent = null
  const parsedUrl = url.parse(finalUrl)

  if (parsedUrl.protocol === 'https:') {
    finalAgent = https.globalAgent
  } else {
    finalAgent = http.globalAgent
  }

  proxy.web(req, res, {
    target: finalUrl,
    agent: finalAgent,
    headers: { host: parsedUrl.hostname },
    prependPath: false,
    xfwd : true,
    hostRewrite: finalUrl.host,
    protocolRewrite: parsedUrl.protocol
  })
})

console.log('listening on port ' + PROXY_PORT)
server.listen(PROXY_PORT)
