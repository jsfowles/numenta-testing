import classNames from 'classnames'
import IconAngleUp from 'react-icons/lib/fa/angle-up'
import {prefixLink} from 'gatsby-helpers'  // eslint-disable-line import/no-unresolved, max-len
import React from 'react'

import {hasSessionStorage} from '../../utils/client'

import SectionTitle from '../SectionTitle'

import styles from './index.css'


/**
 *
 */
class Section extends React.Component {

  static contextTypes = {
    config: React.PropTypes.object,
    router: React.PropTypes.object,
  }

  static defaultProps = {
    headline: false,
    open: false,
  }

  static propTypes = {
    children: React.PropTypes.any.isRequired,
    headline: React.PropTypes.bool.isRequired,
    id: React.PropTypes.string,
    open: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      open: props.open || false,
    }
  }

  _toggleSection() {
    const {ga, history, sessionStorage} = global.window
    const {url} = this.props
    const open = !this.state.open
    const hasStorage = hasSessionStorage()

    // Handle dynamic url changes as sections are opened/closed.
    if (open) {
      history.pushState({}, '', prefixLink(url))
      ga('set', 'page', prefixLink(url))
      ga('send', 'pageview')

      // mark section state as Open in browser sessionStorage
      if (hasStorage) sessionStorage.setItem(url, 'open')
    }
    else {
      // mark section state as Closed in browser sessionStorage
      if (hasStorage) sessionStorage.removeItem(url)  // eslint-disable-line
    }

    this.setState({open})
  }

  render() {
    const {children, headline, id, title} = this.props
    const {open} = this.state
    const isHeadline = headline === true
    const isOpen = open === true
    const articleClasses = [styles.article, styles.closed]
    let close

    if (isOpen) articleClasses.pop()

    if (!isHeadline) {
      close = (
        <div
          className={styles.closeButton}
          onClick={() => this._toggleSection()}
          title={`Close Section: ${title}`}
        >
          <IconAngleUp className={styles.closeIcon} color="inherit" />
          Close Section
        </div>
      )
    }

    return (
      <section id={id} className={styles.section}>
        <SectionTitle
          clickHandle={() => this._toggleSection()}
          headline={headline}
          open={open}
          title={`${open ? 'Close' : 'Open'} Section: ${title}`}
        >
          {title}
        </SectionTitle>
        <div className={classNames(...articleClasses)}>
          {children}
          {close}
        </div>
      </section>
    )
  }

}

export default Section
