import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'throttle-debounce';
import { SORTING_OPTIONS, PRICE_RANGE } from '../../constants';
import HsInput from '../common/HsInput';
import HsButton from '../common/HsButton';
import HsSlider from '../common/HsSlider';

import './styles.css';

class Filter extends Component {
  searchDebounced = debounce(500, this.props.search);
  handleChange = (key, value) => {
    this.props.apply(key, value);
    this.searchDebounced();
  };
  priceRangeLabelFormatter = value => {
    return `$${value * Math.round(PRICE_RANGE.MAX / 100)}`;
  };
  render() {
    return (
      <form className="filter-form">
        <div>
          <HsInput
            className="title-filter-input"
            name="title"
            placeholder="Search..."
            type="text"
            value={this.props.title}
            onChange={e => this.handleChange('title', e.target.value)}
          />
        </div>
        <div className="filter-panel">
          <HsButton className="filter-panel-item" type="button" onClick={() => this.handleChange('sort', SORTING_OPTIONS.TITLE)}>
            ↑↓ Hotel
          </HsButton>
          <HsButton className="filter-panel-item" type="button" onClick={() => this.handleChange('sort', SORTING_OPTIONS.PRICE)}>
            ↑↓ Price $
          </HsButton>
          <div className="filter-panel-item">
            <HsSlider
              min={0}
              max={100}
              tipFormatter={this.priceRangeLabelFormatter}
              labelFormatter={this.priceRangeLabelFormatter}
              defaultValue={[this.props.priceFrom, this.props.priceTo]}
              onChange={e => this.handleChange('priceRange', e)}
            />
          </div>
        </div>
      </form>
    );
  }
  static propTypes = {
    apply: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    priceFrom: PropTypes.number.isRequired,
    priceTo: PropTypes.number.isRequired
  };
}
export default Filter;
