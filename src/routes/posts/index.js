import React from 'react'
import Layout from 'components/Layout'

export default {

  path: '/posts',
  name: 'posts',

  async action({ fetch }) {
    const resp = await fetch('/api/v1/posts')
    let posts = await resp.json()
    // if (!posts || !posts.length) posts = []
    // throw new Error('Failed to load the posts feed.')

    const Posts = await new Promise((resolve) => {
       require.ensure([], (require) => resolve(require('./Posts').default), 'home');
     });

    return {
      title: 'Posts',
      component: <Layout><Posts posts={posts} /></Layout>,
    }
  },
}
