const express = require('express')
const request = require('request')
const http = require('http')

const app = express()
app.use('/favicon.ico', function (req, res) {
  res.sendfile('./assets/bbb')
})

app.use('/', function (req, res) {
  console.log(req.url)
  const url = `http://www.baidu.com/s?wd=${req.url.split('=')[1]}`
  // const url = `http://www.baidu.com/${req.url}`
  req.pipe(request(url)).pipe(res)
})

app.listen(process.env.PORT || 4000)

// http.createServer((request, response) => {
//   http.request(request.url, (res) => {
//     res.pipe(response)
//   }).on('error', (err) => {
//     console.log(err)
//   }).end()
// }).listen(8080)

// http.createServer((req, res) => {
//   req.pipe(request(req.url)).pipe(res)
// }).listen(8080)
