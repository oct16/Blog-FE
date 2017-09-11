import React from 'react';
import Home from './Home';

const title = 'home';

export default {

  path: '/',
  name: 'home',

  async action({ fetch, params }) {

    return {
      title,
      component: <Home/>,
    }
  },
}
