import React from 'react';
import Layout from '../../components/Layout';

const title = 'Admin Modify';
const isAdmin = false;

export default {
  path: '/admin/modify/:id',
  async action({ fetch, params }) {
    const AdminModify = await require.ensure([], require => require('./AdminModify').default, 'AdminModify')
    const resp = await fetch('/api/v1/post/' + params.id)
    if (resp.status !== 200) {
      return { redirect: '/login' }
    }
    const post = await resp.json()
    return {
      title,
      chunk: 'AdminModify',
      component: <Layout><AdminModify title={title} post={post} params={params}/></Layout>,
    };
  },

};
