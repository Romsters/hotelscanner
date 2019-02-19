import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Hotel = ({ title, price, shortDescription, picture }) => (
  <div className="hotel-card">
    <div className="hotel-picture-wrapper">
      <img src={picture} alt={title} />
    </div>
    <div className="hotel-info-wrapper">
      <div className="hotel-info">Hotel: {title}</div>
      <div className="hotel-info">Price: ${price}</div>
      <div className="hotel-info">Short description: {shortDescription}</div>
    </div>
  </div>
);

Hotel.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  shortDescription: PropTypes.string,
  picture: PropTypes.string
};

export default Hotel;
