import React from 'react';
import PropTypes from 'prop-types';

import s from './Admin.css';
import Link from 'components/Link';
import history from 'history';



class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(
      {
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
      }
    )).isRequired
  }

  static contextTypes = { fetch: PropTypes.func.isRequired }

  deletePost = (id) => {
    if (window.confirm("Do you really want to delete this post?")) {
      // this.context.fetch()
      this.context.fetch("/api/v1/admin/post/" + id , {
        method: "DELETE"
      }).then(res => {
        this.getPosts()
      })
    }
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Link className={s.button} to={"/admin/new"}>发表文章</Link>
          {/* <h2>{this.props.title}</h2> */}
            {this.props.posts.map(item => (
              <article key={item.title} className={s.postItem}>
                <h3 className={s.postTitle}>
                  <Link to={"/post/" + item.title}>{item.title}</Link>
                  <span className={s.operateLink}>
                    <Link to={"/admin/modify/" + item.id}>编辑</Link>
                  </span>
                  <span className={s.operateLink}>
                    <a onClick={this.deletePost.bind(item, item.id)}>删除</a>
                  </span>
                </h3>
              </article>
            ))}
        </div>
      </div>
    )
  }
}

export default Admin
