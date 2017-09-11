import React from 'react';
import Layout from 'components/Layout';
import New from './New';

const title = 'New Post';

export default {

  path: '/admin/new',
  name: 'new',

  action() {

    return {
      title,
      component: <Layout><New title={title} /></Layout>,
    };
  },

};
