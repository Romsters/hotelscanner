import { SORTING_OPTIONS } from '../constants';

const state = {
  app: {
    isLoading: true,
    isLoaded: false,
    isLoadingFailed: false,
    isHotelsLoading: false,
    isHotelsLoaded: false,
    isHotelsLoadingFailed: false,
    hotels: [],
    hasMore: true,
    page: 1,
    filter: {
      title: '',
      priceRange: {
        from: 0,
        to: 100
      },
      sort: SORTING_OPTIONS.TITLE
    }
  }
};

export default state;
