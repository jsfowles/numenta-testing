import Helmet from 'react-helmet'
import {zipObject} from 'lodash'
import React from 'react'

import {sortDateDescend} from '../../utils/shared'

import Anchor from '../../components/Anchor'
import ListItem from '../../components/ListItem'
import ListOrder from '../../components/ListOrder'
import Section from '../../components/Section'
import Spacer from '../../components/Spacer'
import SubTitle from '../../components/SubTitle'
import Subtle from '../../components/Subtle'
import TextLink from '../../components/TextLink'

import styles from './index.css'

const title = 'Sitemap'

const SitemapItem = (props) => {
  const {data, path} = props
  return (
    <ListItem {...props}>
      <TextLink to={path}>
        {data.title}
      </TextLink> {' '}
      <Spacer />
      <Subtle>{data.date}</Subtle>
    </ListItem>
  )
}
SitemapItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  path: React.PropTypes.string.isRequired,
}


/**
 *
 */
const SitemapPage = (props, {config, route}) => {
  const {links} = config
  const {pages} = route
  const categories = [
    'blog',
    'careers',
    'events',
    'newsletter',
    'press',
    'resources',
  ]
  const posts = categories
    .map((category) => pages
      .filter(({data, file}) => {
        const matcher = new RegExp(`.*${category}\/.*\.md`)
        return (data.type === 'post') && file.path.match(matcher)
      })
      .sort(sortDateDescend)
      .map((post) => {
        post.key = post.file.stem
        return React.createElement(SitemapItem, post)
      })
    )
  const items = zipObject(categories, posts)

  return (
    <article>
      <Helmet title={title} />
      <Section headline={true} open={true} title={title}>

        <div className={styles.columns}>
          <div className={styles.content}>

            <Anchor name="main" />
            <SubTitle>Main</SubTitle>
            <ListOrder marker="disc">
              <ListItem>
                <TextLink to={links.in.home}>
                  Home
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.mission}>
                  Mission &amp; History
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.technology}>
                  Technology Overview
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.opensource}>
                  Open Source Community
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.applications}>
                  Applications
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.partners}>
                  Partners
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.business}>
                  Business Strategy &amp; IP
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.anomaly}>
                  Anomaly Detection Benchmark
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.resources}>
                  Papers, Videos &amp; More
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.careers}>
                  Careers, Team &amp; Contact
                </TextLink>
              </ListItem>
            </ListOrder>

            <Anchor name="careers" />
            <SubTitle>
              <TextLink to={links.in.careers}>
                Careers
              </TextLink>
            </SubTitle>
            <ListOrder marker="disc">
              {items.careers}
            </ListOrder>

            <Anchor name="other" />
            <SubTitle>Other</SubTitle>
            <ListOrder marker="disc">
              <ListItem>
                <TextLink to={links.in.privacy}>
                  Privacy Policy
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.terms}>
                  Terms of Service
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.sitemap}>
                  Sitemap
                </TextLink>
              </ListItem>
            </ListOrder>

          </div>
          <div className={styles.aside}>

            <Anchor name="our-work" />
            <SubTitle>Our Work</SubTitle>
            <ListOrder marker="disc">
              <ListItem>
                <TextLink to={links.in.bami}>
                  Biological and Machine Intelligence
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.htmstocks}>
                  HTM for Stocks
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.htmstudio}>
                  HTM Studio
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.nab}>
                  Numenta Anomaly Benchmark
                </TextLink>
              </ListItem>
              <ListItem>
                <TextLink to={links.in.papers}>
                  Research Papers
                </TextLink>
              </ListItem>
            </ListOrder>

            <Anchor name="resources" />
            <SubTitle>
              <TextLink to={links.in.resources}>
                Resources
              </TextLink>
            </SubTitle>
            <ListOrder marker="disc">
              {items.resources}
            </ListOrder>

          </div>
        </div>
        <div className={styles.columns}>
          <div className={styles.content}>

            <Anchor name="newsletter" />
            <SubTitle>
              <TextLink to={links.in.newsletter}>
                Newsletter
              </TextLink>
            </SubTitle>
            <ListOrder marker="disc">
              {items.newsletter}
            </ListOrder>

          </div>
          <div className={styles.aside}>

            <Anchor name="press" />
            <SubTitle>
              <TextLink to={links.in.press}>
                Press Releases
              </TextLink>
            </SubTitle>
            <ListOrder marker="disc">
              {items.press}
            </ListOrder>

          </div>
        </div>
        <div className={styles.columns}>
          <div className={styles.content}>

            <Anchor name="events" />
            <SubTitle>
              <TextLink to={links.in.events}>
                Events
              </TextLink>
            </SubTitle>
            <ListOrder marker="disc">
              {items.events}
            </ListOrder>

          </div>
          <div className={styles.aside}>

            <Anchor name="blog" />
            <SubTitle>
              <TextLink to={links.in.blog}>
                Blog
              </TextLink>
            </SubTitle>
            <ListOrder marker="disc">
              {items.blog}
            </ListOrder>

          </div>
        </div>

      </Section>
    </article>
  )
}

SitemapPage.contextTypes = {
  config: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default SitemapPage
