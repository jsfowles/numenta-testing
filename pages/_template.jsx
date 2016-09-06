import favicons from 'favicons/config/html'
import {flatten, keys, mapValues, values} from 'lodash'
import GoogleAnalytics from 'react-g-analytics'
import Helmet from 'react-helmet'
import injectTapEventPlugin from 'react-tap-event-plugin'
import moment from 'moment'
import {prefixLink} from 'gatsby-helpers'  // eslint-disable-line import/no-unresolved, max-len
import React from 'react'

import {getConfig, getVersion, stamp} from '../utils/shared'

import Layout from '../components/Layout'

import 'tachyons-base/css/tachyons-base.css'  // eslint-disable-line import/imports-first, max-len
import '../static/assets/css/fonts.css'

const config = getConfig()


/**
 *
 */
class Template extends React.Component {

  static propTypes = {
    children: React.PropTypes.any.isRequired,
    location: React.PropTypes.object.isRequired,
    route: React.PropTypes.object.isRequired,
  }

  static childContextTypes = {
    config: React.PropTypes.object,
    route: React.PropTypes.object,
  }

  getChildContext() {
    const {route} = this.props
    return {config, route}
  }

  componentDidMount() {
    if (global.window) injectTapEventPlugin()  // remove @ React 1.0
  }

  render() {
    const {children} = this.props
    const {analytics, description, siteHost, siteTitle} = config
    const lang = 'en'  // @TODO i18n l10n
    const now = moment().toString()
    const title = `${siteTitle} — ${description}`
    const titleForm = `%s | ${siteHost}`
    const ver = getVersion()
    const icons = flatten(values(mapValues(favicons, (value) => keys(value))))

    // react-helmet / head
    const attrs = {lang, amp: undefined}
    const links = []
    const meta = [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
      {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
      {name: 'author', content: `${siteTitle}`},
      {name: 'description', content: title},
      {name: 'generator', content: `© ${siteHost} v${ver} ${now} Gatsby.js`},
      {name: 'keywords', content: title.split(' ').join(',')},
    ]

    // production stylesheet bundle
    if (process.env.NODE_ENV === 'production') {
      links.push({rel: 'stylesheet', href: prefixLink(stamp('/styles.css'))})
    }

    // push auto-generated favicons into react-helmet header link and meta
    icons.forEach((icon) => {
      const type = icon.match(/^(\w+)\[/).pop()
      const target = (type === 'link') ? links : meta
      const details = {}
      icon.match(/\[.+?\]/g)
        .forEach((detail) => {
          const line = detail.replace(/[\[\]]/g, '')
          const [key, value] = line.split(/\$?=/)
          const clean = value.replace(/'/g, '')
          details[key] = (key === 'href') ? prefixLink(`/${clean}`) : clean
        })
      target.push(details)
    })

    return (
      <Layout>
        <GoogleAnalytics id={analytics.google} />
        <Helmet
          defaultTitle={title}
          htmlAttributes={attrs}
          link={links}
          meta={meta}
          titleTemplate={titleForm}
        />
        {children}
      </Layout>
    )
  }

}

export default Template
