import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { search, apply } from '../store/app/actions';
import Hotel from '../components/Hotel';
import Filter from '../components/Filter';

import './styles.css';

export class Hotels extends Component {
  componentDidMount() {
    this.props.actions.search();
  }
  render() {
    const { hotels, hasMore, isHotelsLoading, filter, actions } = this.props;
    return (
      <div className="hotels-page">
        <Filter
          title={filter.title}
          priceFrom={filter.priceRange.from}
          priceTo={filter.priceRange.to}
          apply={actions.apply}
          search={actions.search}
        />
        <InfiniteScroll
          pageStart={2}
          initialLoad={false}
          loadMore={actions.search}
          hasMore={hasMore}
          loader={
            isHotelsLoading && (
              <div className="loader" key={0}>
                Loading ...
              </div>
            )
          }
          style={{}}
        >
          <ul className="hotels-list">
            {hotels.map(hotel => (
              <li className="hotels-list-item" key={hotel._id}>
                <Hotel title={hotel.title} price={hotel.price} shortDescription={hotel.shortDescription} picture={hotel.picture} />
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      </div>
    );
  }
  static propTypes = {
    hotels: PropTypes.array.isRequired,
    isHotelsLoaded: PropTypes.bool.isRequired,
    isHotelsLoading: PropTypes.bool,
    hasMore: PropTypes.bool,
    filter: PropTypes.object.isRequired
  };
}

function mapStateToProps(state) {
  return {
    hotels: state.app.hotels,
    isHotelsLoaded: state.app.isHotelsLoaded,
    isHotelsLoading: state.app.isHotelsLoading,
    hasMore: state.app.hasMore,
    filter: state.app.filter
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ search, apply }, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hotels);
