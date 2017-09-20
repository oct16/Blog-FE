import React from 'react'
import Layout from 'components/Layout'
import Resume from 'components/Docment/Resume'

export default {
  path: '/resume/purty',
  async action() {

    const data = await require.ensure([], require => require('./resume.md'), 'resume');
    return {
      title: 'Resume-Purty',
      chunk: 'Resume-Purty',
      component: <Resume {...data} />
    }
  },
}
