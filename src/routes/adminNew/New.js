import React from 'react';
import PropTypes from 'prop-types';

import s from './New.css';
import Link from 'components/Link';
import history from 'history';
import { message } from 'antd'

class AdminNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: ''
    }
    this.titleChange = this.titleChange.bind(this)
    this.contentChange = this.contentChange.bind(this)
  }
  static contextTypes = {
    fetch: PropTypes.func.isRequired
  }
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  newPost = () => {
    const title = this.state.title
    const content = this.state.content
    this.postPost({title, content}).then(res => {
      const postTitle = res.title
      const path = `/post/${decodeURIComponent(postTitle)}`
      message.success("发布成功")
      history.push(path)
    }, err => {
      message.error(err.message)
    })
  }

  async postPost({ title, content }) {
    const ret = await this.context.fetch('/api/v1/admin/post', {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
      })
    })

    const result = await ret.json()
    if (!ret.ok) return Promise.reject(result)
    return result
  }

  contentChange(event) {
    this.setState({
      content: event.target.value
    })
  }

  titleChange (event) {
    this.setState({
      title: event.target.value
    })
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <input className={s.title}
            placeholder="文章标题"
            onChange={this.titleChange}
            value={this.state.title}/>
          <textarea className={s.content}
            placeholder="文章内容"
            value={this.state.content}
            onChange={this.contentChange}>
          </textarea>
          <button onClick={this.newPost}>创建</button>
        </div>
      </div>
    )
  }
}

export default AdminNew
