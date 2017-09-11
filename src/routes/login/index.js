import React from 'react';
import Layout from 'components/Layout';
import Login from './Login';

const title = 'Log In';

export default {

  path: '/login',
  name: 'login',

  action() {

    return {
      title,
      component: <Layout><Login title={title} /></Layout>,
    };
  },

};
