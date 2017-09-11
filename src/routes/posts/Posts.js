import React from 'react';
import PropTypes from 'prop-types';

import s from './Posts.css';
import Link from 'components/Link';

class Posts extends React.Component {

  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(
      {
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired}
       )).isRequired
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.postContainer}>
            {this.props.posts.map(item => (
              <article key={item.title} className={s.postItem}>
                <h3 className={s.postTitle}>
                  <Link to={"/post/" + item.title}>{item.title}</Link>
                </h3>
                <Link to={"/post/" + item.title}>
                  <div className={s.postDesc}
                    dangerouslySetInnerHTML={{
                    __html: item.content
                  }}/>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Posts
