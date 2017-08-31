import React from 'react';
import Layout from '../../components/Layout';
import Post from '../../components/Post';

const title = 'Post';

export default {

  path: '/post/:title',

  async action({ fetch, params }) {

    const title = params.title
    const resp = await fetch(`/api/v1/post/title/${encodeURIComponent(title)}`, {
      method: "GET"
    })
    const post = await resp.json()
    if (!post) throw new Error('Failed to load the post.')

    return {
      title,
      component: <Layout><Post post={post} params={params}/></Layout>,
    }
  },
}
