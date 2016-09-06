import classNames from 'classnames'
import React from 'react'

import styles from './index.css'


/**
 *
 */
const TableTitle = ({border, children, colSpan}) => {
  const classes = [styles.tableTitle]

  if (border) classes.push(styles.border)

  return (
    <th className={classNames(...classes)} colSpan={colSpan}>
      {children}
    </th>
  )
}

TableTitle.propTypes = {
  border: React.PropTypes.bool,
  children: React.PropTypes.any,
  colSpan: React.PropTypes.number.isRequired,
}

TableTitle.defaultProps = {
  colSpan: 1,
}

export default TableTitle
