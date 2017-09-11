import React from 'react'
import Layout from 'components/Layout'

export default {

  path: '/home',
  name: 'home',

  async action({ fetch }) {
    const resp = await fetch('/api/v1/posts')
    let posts = await resp.json()
    // if (!posts || !posts.length) posts = []
    // throw new Error('Failed to load the posts feed.')

    const Home = await new Promise((resolve) => {
       require.ensure([], (require) => resolve(require('./Home').default), 'home');
     });

    return {
      title: 'Posts',
      component: <Layout><Home posts={posts} /></Layout>,
    }
  },
}
