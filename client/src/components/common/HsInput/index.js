import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './styles.css';

export default function HsInput({ className, ...other }) {
  const classes = classnames('hc-input', className);
  return <input className={classes} {...other} />;
}

HsInput.propTypes = {
  other: PropTypes.object
};
