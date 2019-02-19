import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Hotels from '../pages/Hotels';
import * as actions from '../store/app/actions';
import { isAppLoading, isAppLoadingFailed } from '../store/app/selectors';

export class Shell extends Component {
  componentDidMount() {
    this.props.actions.load();
  }
  render() {
    const { isLoading, isLoadingFailed } = this.props;

    return !isLoading && (isLoadingFailed ? <h1>Something went wrong.</h1> : <Hotels />);
  }
  static propTypes = {
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingFailed: PropTypes.bool.isRequired
  };
}

function mapStateToProps(state) {
  return {
    isLoading: isAppLoading(state),
    isLoadingFailed: isAppLoadingFailed(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shell);
