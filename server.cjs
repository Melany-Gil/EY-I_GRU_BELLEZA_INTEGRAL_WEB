const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png'};
http.createServer((req,res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(file !== root && !file.startsWith(root + path.sep)){res.writeHead(403);res.end();return;}
  const target = file === root ? path.join(root,'index.html') : file;
  fs.readFile(target,(error,data)=>{res.writeHead(error?404:200,{'Content-Type':types[path.extname(target)]||'application/octet-stream'});res.end(error?'No encontrado':data);});
}).listen(4187,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4187'));
