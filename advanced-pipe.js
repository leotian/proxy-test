const app = require('express')()
const request = require('request')
const cheerio = require('cheerio')
const concat = require('concat-stream')
const zlib = require('zlib')
const url = require('url')
//request.debug = true

//相关配置
const APP_CONF = {
  reverse_url: "http://www.baidu.com",
  port: 8000,
  cookie: "",
  debug: true
}
app.use('/', reverse)

function reverse(req, res) {
  debug({
    path: req.originalUrl,
    // url: APP_CONF.reverse_url + req.originalUrl,
    url: req.originalUrl,
    method: req.method
  })
  const cookie = APP_CONF.cookie
  // 反向代理链接
  const options = {
    // url: APP_CONF.reverse_url + req.originalUrl,
    url: req.originalUrl,
    headers: {
      //cookie: APP_CONF.cookie
    }
  }
  let r = null
  if (/POST|PUT/i.test(req.method)) { //假如是post／put请求
    r = request.post(Object.assign(options, { json: req.body }))
      .on('response', function (response) {
        // 响应相应post/put请求
      })
    req.pipe(r).pipe(res)
  } else {
    let mime = ''
    let isGzip = false
    r = request(options)
      .on('response', function (response) {
        mime = response.headers['content-type']
        if (response.headers['content-encoding'] == 'gzip') {
          isGzip = true
        }
        res.writeHead(response.statusCode, response.headers)
      })
    // req 可读流 ==传递chunk==> r 可写流 ==返回目标流传递chunk==> concat 可写流
    req.pipe(r).pipe(concat(function (body) {
      // 拦截内容，根据mime去处理不同body
      debug({
        mime: mime,
        divide: "========================="
      })
      if (mime && mime.indexOf("text/html") !== -1) {
        if (isGzip) {
          const decoded = zlib.gunzipSync(body)
          // console.log(decoded)
          // const html = decoded.toString().replace(/百度/g, '谷歌')
          const html = decoded.toString()
          const $ = cheerio.load(html)
          // console.log($('.mnav').text('点我'))
          // html相关处理
          // cheerio
          body = $.html()
          res.end(zlib.gzipSync(body))
        } else {
          const $ = cheerio.load(decoded.toString())
          // html相关处理
          // cheerio
          body = $.html()
          res.end(body)
        }
      }
    }))
  }
}

function debug(obj) {
  if (APP_CONF.debug) {
    for (const i in obj) {
      console.log(i + ":", obj[i])
    }
  }
}

const server = app.listen(APP_CONF.port, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('app listening at http://%s:%s', host, port)
})
