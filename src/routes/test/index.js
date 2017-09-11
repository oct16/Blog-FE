import React from 'react'
import Layout from 'components/Layout'
import Transition from 'react-transition-group/Transition';

export default {

  path: '/test',
  name: 'test',

  async action({ fetch }) {

    const Test = await new Promise((resolve) => {
       require.ensure([], (require) => resolve(require('./Test').default), 'test');
     });

    return {
      title: 'test',
      component: <Layout><Test /></Layout>,
    }

  },
}
