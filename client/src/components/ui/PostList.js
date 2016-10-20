import React, { Component } from 'react';
import map from 'lodash/fp/map';
import axios from 'axios';
import {Link} from 'react-router';
import Settings from '../../settings';
import filter from 'lodash/fp/filter';


export default class PostList extends Component {
  constructor() {
    super();
    this.state={
      posts: []
    };
  }
  getStyles() {
    return {
      content: {
        position: 'relative',
        width: '100%',
        height: '60px',
        maxWidth: '600px',
        margin: '20px auto',
        backgroundColor: '#fff',
        borderRadius: '5px',
        padding: '16px',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
      },
      title: {
        fontSize: '1.2em'
      },
      link: {
        display: 'inline-block',
        fontSize: '.9em',
        color: '#00bcd4',
        opacity: '.8',
        textDecoration: 'none',
        paddingLeft: '10px',
        paddingRight: '10px'
      },
      a: {
        textDecoration:'none',
        color:'#000',
        position:'absolute',
        right:'16px',
        top:'20px'
      },
      button: {
         display: 'block',
         margin: '30px auto',
         width: '120px',
         height: '36px',
         lineHeight: '36px',
         textAlign: 'center',
         backgroundColor: '#ff4081',
         fontSize: '1em',
         color: '#fff',
         textDecoration: 'none',
         borderRadius: '20px'
       }
    }
  }
  componentDidMount() {
    //  Promise
    axios.get('http://localhost:3000/posts').then(res => {
    this.setState({
        posts: res.data.posts
      });
      console.log(this.state.posts);
    });
  }
  filterPosts(id) {
     const posts = filter((posts) => {
      return posts._id !== id
     }, this.state.posts);

     this.setState({ posts: posts })
   }
  handleClick(postId) {
     axios.delete(`${Settings.host}/posts/${postId}`).then( res=>{
      console.log(res.data)
      console.log('filering..!');
      this.filterPosts(postId);
      // 筛除已经删除的这个 post
     })
   }
  render() {
    const styles = this.getStyles();
    const postList = map( (post) => {
      return (
        <div style={styles.content} key={post._id}>
            <div style={styles.title}>{post.title}</div>
            <div style={styles.a}>
              <Link to= {`/posts/${post._id}`} style={styles.link}>查看</Link>
              <Link to= {`/posts/${post._id}/edit`} style={styles.link}>修改</Link>
              <Link to={``} style={styles.link} onClick={this.handleClick.bind(this,post._id)}>删除</Link>
            </div>
        </div>
      )
    }, this.state.posts);
    return(
      <div>
        <Link to='/write' style={styles.button}>写文章</Link>
        { postList }
      </div>
    );
  }
}
