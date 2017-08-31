import React from 'react';
import Layout from '../../components/Layout';

const title = 'Admin Page';

export default {

  path: '/admin',

  async action({ fetch }) {


    const Admin = await require.ensure([], require => require('./Admin').default, 'admin');

    const resp = await fetch('/api/v1/admin/posts')
    if (resp.status !== 200) {
      return { redirect: '/login' }
    }
    let posts = await resp.json()

    // if (!posts || !posts.length) posts = []
    //throw new Error('Failed to load the admin posts feed.')
    // return { redirect: '/login' };

    return {
      title,
      chunk: 'admin',
      component: <Layout><Admin title={title} posts={posts}/></Layout>,
    };
  },

};
