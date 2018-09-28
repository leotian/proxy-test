const PORT = 8080

const http = require('http')
const url=require('url')
const fs=require('fs')
const mine=require('./mime').types
const path=require('path')

const server = http.createServer(function (request, response) {
  const pathname = url.parse(request.url).pathname
  console.log(pathname)
  const realPath = path.join("assets", pathname)
  console.log(realPath)
  let ext = path.extname(realPath)
  ext = ext ? ext.slice(1) : 'unknown'
  fs.exists(realPath, function (exists) {
    if (!exists) {
      response.writeHead(404, {
        'Content-Type': 'text/plain'
      })

      response.write("This request URL " + pathname + " was not found on this server.")
      response.end()
    } else {
      fs.readFile(realPath, "binary", function (err, file) {
        if (err) {
          response.writeHead(500, {
            'Content-Type': 'text/plain'
          })
          response.end(err)
        } else {
          const contentType = mine[ext] || "text/plain"
          response.writeHead(200, {
            'Content-Type': contentType
          })
          response.write(file, "binary")
          response.end()
        }
      })
    }
  })
})
server.listen(PORT)
console.log("Server runing at port: " + PORT + ".")
