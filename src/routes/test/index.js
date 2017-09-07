import React from 'react'
import Layout from '../../components/Layout'

export default {

  path: '/test',
  name: 'test',

  async action({ fetch }) {
    const resp = await fetch('/api/v1/posts')
    let posts = await resp.json()
    // if (!posts || !posts.length) posts = []
    // throw new Error('Failed to load the posts feed.')

    const Test = await new Promise((resolve) => {
       require.ensure([], (require) => resolve(require('./Test').default), 'test');
     });

    return {
      title: 'test',
      component: <Layout><Test posts={posts} /></Layout>,
    }
  },
}
