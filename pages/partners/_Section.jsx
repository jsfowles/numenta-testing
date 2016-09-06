import React from 'react'

import Anchor from '../../components/Anchor'
import Image from '../../components/Image'
import ImageLink from '../../components/ImageLink'
import List from '../../components/List'
import ListItem from '../../components/ListItem'
import LogoMark from '../../components/LogoMark'
import Paragraph from '../../components/Paragraph'
import SubTitle from '../../components/SubTitle'
import TextLink from '../../components/TextLink'

import ImageCortical from './images/cortical.png'
import ImageGrokstream from './images/grokstream.png'
import styles from './index.css'


/**
 *
 */
const SectionPartners = (props, {config}) => {
  const {contact, links} = config

  return (
    <article>
      <div className={styles.columns}>
        <div className={styles.aside}>
          <div className={styles.logomark}>
            <LogoMark />
          </div>
        </div>
        <div className={styles.content}>
          <Paragraph lead={true}>
            Numenta works with strategic partners to bring the power of HTM
            to the market. While we focus on the science and the
            core tasdfasdfasdfasdfan application layer tuned to
            market needs.
          </Paragraph>
          <Paragraph>
            We are flexible in structuring these relationships in a way
            that works for both parties. If you are interested in becoming
            a partner, please {' '}
            <TextLink to={links.out.license}>
              review our license guide,
            </TextLink> {' '}
            and email us at {' '}
            <TextLink to={`mailto:${contact.email.sales}`}>
              {contact.email.sales}.
            </TextLink>
          </Paragraph>
        </div>
      </div>

      <Anchor name="cortical" />
      <SubTitle>Cortical.io</SubTitle>
      <div className={styles.columns}>
        <div className={styles.aside}>
          <ImageLink to={links.out.cortical}>
            <Image
              alt="Cortical.io logo"
              respond="mw"
              shadow={false}
              src={ImageCortical}
            />
          </ImageLink>
        </div>
        <div className={styles.content}>
          <Paragraph>
            Cortical.io is leading the next generation of natural language
            processing: language intelligence. Founded on core principles of
            HTM, Cortical.io’s Semantic Folding technology translates text
            into sparse distributed representations. This enables a host of
            exciting applications that have challenged computer scientists for
            decades including sentiment analysis, automatic summarization,
            semantic search and conversational dialogue systems.
          </Paragraph>
          {/* eslint-disable max-len */}
          <List marker="disc">
            <ListItem>
              <TextLink to={links.out.cortical}>
                Cortical.io
              </TextLink>
            </ListItem>
            <ListItem>
              <TextLink to="http://www.cortical.io/static/downloads/semantic-folding-theory-white-paper.pdf">
                Whitepaper: Semantic Folding
              </TextLink>
            </ListItem>
            <ListItem>
              <TextLink to="/press/2015/05/14/numenta-and-cortical-io-form-strategic-partnership/">
                Press Release
              </TextLink>
            </ListItem>
            <ListItem>
              <TextLink to="/newsletter/2015/05/14/announcing-relationship-with-cortical-io/">
                Newsletter
              </TextLink>
            </ListItem>
          </List>
          {/* eslint-enable max-len */}
        </div>
      </div>

      <Anchor name="grok" />
      <SubTitle>Grok</SubTitle>
      <div className={styles.columns}>
        <div className={styles.aside}>
          <ImageLink to={links.out.grok}>
            <Image
              alt="Grok Stream logo"
              respond="mw"
              shadow={false}
              src={ImageGrokstream}
            />
          </ImageLink>
        </div>
        <div className={styles.content}>
          <Paragraph>
            Grok is using HTM technology for advanced IT anomaly detection.
            Grok applies Numenta&#39;s breakthrough technology to solving the IT
            department’s hardest problems, with a complete enterprise
            solution. Its modern user interface makes it easy to drill down to
            important anomalies and take action before a problem worsens.
          </Paragraph>
          {/* eslint-disable max-len */}
          <List marker="disc">
            <ListItem>
              <TextLink to={links.out.grok}>
                Grok
              </TextLink>
            </ListItem>
            <ListItem>
              <TextLink to="/press/2015/08/19/numenta-announces-licensing-of-grok-for-it-to-avik-partners/">
                Press Release
              </TextLink>
            </ListItem>
            <ListItem>
              <TextLink to="/newsletter/2015/09/01/partnership-between-numenta-and-avik-partners-on-grok-for-it-analytics/">
                Newsletter
              </TextLink>
            </ListItem>
          </List>
          {/* eslint-enable max-len */}
        </div>
      </div>
    </article>
  )
}

SectionPartners.contextTypes = {
  config: React.PropTypes.object,
}

export default SectionPartners
