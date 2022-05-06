var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

 response.statusCode = 200
 response.setHeader('Content-Type', 'text/html;charset=utf-8')
 const filePath = path ==='/' ? '/index.html' : path
 //为了处理根目录， filePath的存在是必要的  默认首页

 //对后缀名进行获取，相应的对数据类型进行处理

 const index = filePath.indexOf('.')
 const suffix = filePath.substring(index);
 //设置哈希表，利用数据结构的方式对其进行设置
 const fileType = {
    ".html": "text/html",
    ".css":"text/css",
    ".js":"text/javascript",
    ".json":"text/json",
 }
 //利用正则进行匹配 还要对都匹配不到的情况进行考虑
 response.setHeader('Content-Type', `${fileType[suffix]}` ||"text/html");
 let content 
 try{
     content = fs.readFileSync(`./public${filePath}`)
 }catch(error){
     content = "文件不存在"
     response.staticContent = 404;
 }
 response.write(fs.readFileSync(`./public${filePath}`))
 response.end()

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)