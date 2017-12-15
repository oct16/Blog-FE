import React from 'react';
import PropTypes from 'prop-types';

import s from './Post.css';
import Comment from 'containers/comment';

class Post extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    }).isRequired
  }

  componentDidMount(){
    this.highlight()
  }

  highlight () {
    if (!global.document) return
    const blocks = this.contentEl.querySelectorAll('pre code')
    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    })
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h2 className={s.title}>{this.props.post.title}</h2>
        <div ref={el => this.contentEl = el} dangerouslySetInnerHTML={{ __html: this.props.post.content }}></div>
        </div>
        <Comment postId={this.props.post.id} comments={this.props.post.comments} params={this.props.params}/>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css"/>
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
      </div>
    )
  }
}

export default Post
