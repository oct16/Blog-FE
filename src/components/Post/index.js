import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Post.css';
import Comment from '../../containers/comment';
import Highlight from 'react-highlight'

class Post extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h2 className={s.title}>{this.props.post.title}</h2>
          <Highlight className={s.content} class="hljs" innerHTML={true} >
            {this.props.post.content}
          </Highlight>
        </div>
        <Comment postId={this.props.post.id} comments={this.props.post.comments} params={this.props.params}/>
      </div>
    )
  }
}

export default withStyles(s)(Post);
