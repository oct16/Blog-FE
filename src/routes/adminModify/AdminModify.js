import React from 'react';
import PropTypes from 'prop-types';

import s from './adminModify.css';
import Link from 'components/Link';
import { message } from 'antd'
// import qiniu from '../../util/qiniu/index'

class AdminModify extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      comments: []
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
  componentDidMount () {
    this.setState({
      title: this.props.post.title,
      content: this.props.post.content,
      comments: this.props.post.comments
    })
    if (global.Qiniu) {
      delete require.cache[require.resolve('../../util/qiniu')];
      let q = require('../../util/qiniu')
    }

  }

  modifyPost = () => {
    const id = this.props.params.id
    const title = this.state.title
    const content = this.state.content

    this.putPost(id, {title, content}).then(res => {
      message.success("修改成功")
    }, err => {
      message.error(err.message)
    })
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

  async putPost(id, { title, content }) {
    const resp = await this.context.fetch('/api/v1/admin/post/' + id, {
      method: "PUT",
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
      })
    })
    return resp
  }

  async deleteComment (id) {
    const resp = await this.context.fetch('/api/v1/admin/post/comment/' + id, {
      method: "DELETE"
    })
    const result = await resp.json()
    if (resp.status !== 200) {
      return Promise.reject(result)
    }
    return result

  }

  deleteAction = (item) => {
    if (confirm("确定删除吗？")) {
      this.deleteComment(item.id).then(res => {
        location.reload()
      }, err => {
        alert(err)
      })
    }
  }


  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div id="qiniu-uploader">
            <button id="pickfiles">pickfiles</button>
          </div>
          <input className={s.title}
            onChange={this.titleChange}
            value={this.state.title}/>
          <textarea id="md-editor" className={s.content}
            value={this.state.content}
            onChange={this.contentChange}>
          </textarea>
          <button onClick={this.modifyPost}>修改</button>

          <ul className={s.commentList}>
            {this.state.comments.map(item => (
              <li key={item.id}>
                {item.content}
                 <a className={s.deleteLink} onClick={this.deleteAction.bind(null, item)}>删除</a>
              </li>
            ))}
          </ul>
        </div>
        <script src="/vendor/qiniu/plupload/moxie.js"></script>
        <script src="/vendor/qiniu/plupload/plupload.js"></script>
        <script src="/vendor/qiniu/dist/qiniu.min.js"></script>
      </div>
    )
  }
}

export default AdminModify
