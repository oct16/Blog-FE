import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Comment.css';
import Comment from '../../containers/comment';
import Highlight from 'react-highlight'
import githubLogo from './github.svg'
import { timeFormat } from '../../common'
import cs from 'classnames'
class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textAreaVal: ""
    }

    this.textAreaValChange = this.textAreaValChange.bind(this);
    this.commitComment = this.commitComment.bind(this)
  }

  static contextTypes = {
    fetch: PropTypes.func.isRequired
  }

  static propTypes = {
    postId: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  textAreaValChange = (event) => {
    this.setState({ textAreaVal: event.target.value })
  }

  commitComment = async (event) => {
    let allowMaxLen = 500
    if (this.state.textAreaVal.length > allowMaxLen) {
      alert("评论最多允许" + allowMaxLen + "个字，目前输入字数:" + this.state.textAreaVal.length)
      return
    }
    const ret = await this.context.fetch('/api/v1/post/comment', {
      method: "POST",
      body: JSON.stringify({
        user_id: this.props.user.id,
        post_id: this.props.postId,
        content: this.state.textAreaVal,
      })
    })
    const res = await ret.json()
    if (ret.ok) {
      location.reload()
    } else {
      alert(res)
    }
  }

  render() {

    let { user, comments } = this.props
    let isButtonShow = this.state.textAreaVal.length > 0 ? s.buttonShow : ''
    return (
      <div className={s.container}>
        <div className={s.commentLength}>comments {comments.length}</div>
        <ul className={s.lists}>
          {comments.map((comment) =>
            <li key={comment.id} className={s.list}>
              <div className={s.userInfo}>
                <img src={comment.user.avatar}/>
                <span>{comment.user.name}</span>
                <span>{ timeFormat(+new Date(comment.created_at) /*, 'yyyy-MM-dd' */) }</span>
              </div>
              <div>{comment.content}</div>
            </li>
          )}
        </ul>

        { user.name ? (<p className={s.nickName}>{user.name}</p>) : ""}
        <div className={s.commentArea}>
          {
            user.name ? "" :
              (
                <div className={s.commentMask}>
                  <div className={s.centerContainer}>
                    <p>评论请<a className={s.login} href="/login/github">登录</a></p>
                    <a className={s.login} href="/login/github"><img src={githubLogo}/></a>
                  </div>
                </div>
              )
          }
          <textarea placeholder="请输入评论" onChange={this.textAreaValChange} value={this.state.textAreaVal}></textarea>
        </div>
        <button className={cs(s.submit, isButtonShow)} onClick={this.commitComment}>评论</button>
      </div>
    )
  }
}

export default withStyles(s)(Post);
