import React from 'react'
import Home from './Home'
import Layout from '../../components/Layout'

export default {

  path: '/',
  name: 'home',

  async action({ fetch }) {
    const resp = await fetch('/api/v1/posts')
    let posts = await resp.json()
    // if (!posts || !posts.length) posts = []
    // throw new Error('Failed to load the posts feed.')
    return {
      title: 'Posts',
      component: <Layout><Home posts={posts} /></Layout>,
    }
  },
}
