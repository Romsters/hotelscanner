import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import './styles.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export class ExtendedRange extends Component {
  onChange = value => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') onChange(value);
  };
  onAfterChange = value => {
    const { onAfterChange } = this.props;
    if (typeof onAfterChange === 'function') onAfterChange(value);
  };
  render() {
    let { allowCross, tipProps, defaultValue, labelFormatter, onChange, onAfterChange, ...otherProps } = this.props;
    labelFormatter = this.props.labelFormatter || (value => value);
    return (
      <div>
        <Range
          {...otherProps}
          allowCross={allowCross}
          className="hs-slider"
          tipProps={{
            ...tipProps
          }}
          defaultValue={defaultValue}
          value={defaultValue}
          onChange={this.onChange}
          onAfterChange={this.onAfterChange}
        />
        <div className="hs-slider-values">
          <label>{labelFormatter(this.props.min)}</label>
          <label>{labelFormatter(this.props.max)}</label>
        </div>
      </div>
    );
  }
}

export default function HsSclider({ allowCross, tipProps, defaultValue, ...props }) {
  if (!Array.isArray(defaultValue)) {
    defaultValue = [props.min, props.max];
  }
  return (
    <ExtendedRange
      allowCross={allowCross}
      className="hs-slider"
      tipProps={{
        ...tipProps
      }}
      defaultValue={defaultValue}
      {...props}
    />
  );
}

HsSclider.propTypes = {
  allowCross: PropTypes.bool,
  tipProps: PropTypes.object
};

HsSclider.defaultProps = {
  allowCross: false,
  tipProps: {
    placement: 'top',
    align: {
      offset: [0, 3]
    }
  }
};
