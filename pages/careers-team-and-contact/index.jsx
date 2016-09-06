import Helmet from 'react-helmet'
import React from 'react'

import {scrollToSection} from '../../utils/client'

import MainSections from '../_MainSections'
import NextSection from '../../components/NextSection'
import SectionCareers from './_Section'
import Section from '../../components/Section'

const Default = (<SectionCareers key="sectionCareers" />)
const title = 'Careers, Team & Contact'


/**
 *
 */
class CareersPage extends React.Component {

  state = {
    sections: (
      <Section headline={true} open={true} title={title}>
        {Default}
        <NextSection title="Back to Home" url="/" />
      </Section>
    ),
  }

  componentDidMount() {
    this.setState({  // eslint-disable-line react/no-did-mount-set-state
      sections: (<MainSections current={Default} />),
    })
  }

  componentDidUpdate() {
    scrollToSection(global.document.getElementById(Default.key))
  }

  componentWillUnmount() {
    this.setState({sections: []})
  }

  render() {
    const {sections} = this.state
    return (
      <div>
        <Helmet title={title} />
        {sections}
      </div>
    )
  }
}

export default CareersPage
