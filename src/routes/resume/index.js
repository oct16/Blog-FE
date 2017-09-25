import React from 'react'
import Layout from 'components/Layout'
import ResumeSuit from 'components/Docment/ResumeWrap'

export default {
  path: ['/resume/(\\w{2,3})', '/resume'],
  async action() {
    const data = await require.ensure([], require => require('./resume.md'), 'resume');
    return {
      title: 'Resume',
      chunk: 'resume',
      component: <ResumeSuit {...data} />
    }
  },
}
