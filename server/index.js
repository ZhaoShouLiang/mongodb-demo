// 服务器代码--------------------接收请求
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
var Post = require('./modles/post.js');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;//清理
mongoose.connect('mongodb://localhost:27017/express9-30');


// 关闭同源策略 开放 CORS
var cors = require ('cors');
app.use(cors());


var db = mongoose.connection;
  db.on('error', console.log);
db.once('open', function() {
  console.log('success!')
});

var routes = require('./routes');

routes(app);

module.exports=function(app){
  // get all posts
}
 //发布一篇文章
 // app.delete('/posts/:id', function (req, res) {
 //   console.log('DELETE /posts/:id')
 //   res.send('DELETE /posts/:id')
 // })
 //  删除一篇文章


 //读取所有文章
 // app.get('/posts/:id', function (req, res) {
 //   console.log('get /posts/:id1')
 //   res.send('GET /posts/:id2')
 // })
 //  //读取一篇文章
 // app.put('/posts/:id', function (req, res) {
 //   console.log('Put /posts/:id')
 //   res.send('PUT /posts/:id')
 // })
 //更新一篇文章
app.listen(3000,function(){
  console.log('running on port 3000... vist http:localhost:3000')
})
