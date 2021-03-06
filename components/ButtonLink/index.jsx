import classNames from 'classnames'
import React from 'react'

import styles from './index.css'


/**
 * External link only (browser location) for now.
 */
const ButtonLink = ({children, disabled, onClick, theme, to}) => {
  const classes = [styles.buttonLink, styles[theme]]

  if (disabled) classes.push(styles.disabled)
  else classes.push(styles.enabled)

  return (
    <a
      className={classNames(...classes)}
      href={to}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

ButtonLink.propTypes = {
  children: React.PropTypes.any.isRequired,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  theme: React.PropTypes.string,
  to: React.PropTypes.string.isRequired,
}

ButtonLink.defaultProps = {
  disabled: false,
  theme: 'primary',
}

export default ButtonLink
