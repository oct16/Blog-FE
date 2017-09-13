import React from 'react';
import Layout from 'components/Layout';
import A4Doc from 'components/Docment/A4';

export default {
  path: '/resume',
  async action() {

    const data = await require.ensure([], require => require('./resume.md'), 'resume');
    return {
      title: 'Resume',
      chunk: 'resume',
      component: <A4Doc {...data} />
    };
  },

};
