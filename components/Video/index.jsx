import Modal from 'react-modal'
import React from 'react'
import YouTube from 'react-youtube'

import {getBrowserWidth} from '../../utils/client'
import {getModalWidth} from '../../utils/shared'
import Image from '../Image'

import styles from './index.css'
import modalStyles from './_style-modal'


class Video extends React.Component {

  static propTypes = {
    image: React.PropTypes.string.isRequired,
    respond: React.PropTypes.oneOf(['mw', 'w']),
    time: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['youtube']).isRequired,
    videoId: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    type: 'youtube',
  }

  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  _playerClose() {
    this.setState({open: false})
  }

  _playerOpen() {
    this.setState({open: true})
  }

  render() {
    const {image, respond, time, title, type, videoId} = this.props
    const {open} = this.state
    const isOpen = open === true
    const modalWidth = getModalWidth(getBrowserWidth())
    const playerOptions = {
      width: modalWidth.toString(),
      height: (modalWidth * (360 / 640)).toString(),  // ~640x360
      playerVars: {autoplay: 1},
    }
    const alternate = `${title} ${type} video screenshot`
    let player

    if (isOpen && videoId && type === 'youtube') {
      player = (<YouTube opts={playerOptions} videoId={videoId} />)
    }

    return (
      <div className={styles.video}>
        <Image
          alt={alternate}
          border={true}
          onClick={() => this._playerOpen()}
          respond={respond}
          src={image}
        />
        <div className={styles.caption}>
          Video: {title} ({time})
        </div>
        <Modal
          isOpen={open}
          onRequestClose={() => this._playerClose()}
          style={modalStyles}
        >
          {player}
        </Modal>
      </div>
    )
  }

}

export default Video
