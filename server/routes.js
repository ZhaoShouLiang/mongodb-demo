var Post = require('./modles/post');

module.exports = function(app) {
  app.get('/posts', function(req, res) {
    Post.find().exec(function(err, posts) {
      res.json({ posts: posts})
    });
  })

  app.get('/post/:id', function(req, res) {
    Post.findById({_id:req.params.id},function (err,doc) {
      if (err) return res.send('出错了');
      res.json({post: doc})
    })
  })

  app.delete('/posts/:id', function(req, res) {


     Post.findById({_id: req.params.id}, function(err, post) {
       console.log(post);
       post.remove(function(){
         res.json({message: '文章删除成功了！'});
       });
     });
    })

  app.put('/posts/:id', function(req, res) {
    Post.findById({_id: req.params.id}, function(err, post) {
      if (err) return res.status(500).json({error:  err.message});
      for (prop in req.body) {
        post[prop] = req.body[prop];
      }
      post.save(function(err) {
        if (err) return res.status(500).json({error: err.message});
        res.json({message: "文章更新成功了"});
      });
    });
  })

  app.post('/posts', function(req, res) {
    // res.send('the post title is: ' + req.body.title)
    console.log(req.body);
    var post = new Post({
      title:req.body.title,
      category:req.body.category,
      content:req.body.content
    });
    post.save(function(err){
      if(err) return console.log(err);
      console.log('saved!');
    })
    res.json({message:"文章保存成功"})
  })
}
