import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './styles.css';

export default function HsButton({ className, children, ...other }) {
  const classes = classnames('hc-button', className);
  return (
    <button className={classes} {...other}>
      {children}
    </button>
  );
}

HsButton.propTypes = {
  children: PropTypes.node,
  other: PropTypes.object
};
