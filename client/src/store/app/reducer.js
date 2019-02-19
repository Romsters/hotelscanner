import initialState from '../initialState';
import { APP_LOADED, APP_LOADING_FAILED, HOTELS_LOADED, HOTELS_LOADING_FAILED, HOTELS_LOADING_STARTED, FILTER_CHANGED } from './actions';

export default function appReducer(state = initialState.app, action = {}) {
  switch (action.type) {
    case APP_LOADED:
      return Object.assign({}, state, {
        isLoading: false,
        isLoaded: true
      });
    case HOTELS_LOADING_STARTED:
      return Object.assign({}, state, {
        isHotelsLoading: true
      });
    case APP_LOADING_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        isLoadingFailed: true
      });
    case HOTELS_LOADED:
      return Object.assign({}, state, {
        isHotelsLoading: false,
        isHotelsLoaded: true,
        hotels: [...state.hotels, ...action.payload.collection],
        page: state.page + 1,
        hasMore: action.payload.hasMore
      });
    case HOTELS_LOADING_FAILED:
      return Object.assign({}, state, {
        isHotelsLoading: false,
        isHotelsLoadingFailed: true
      });
    case FILTER_CHANGED:
      return Object.assign({}, state, {
        hotels: [],
        page: 1,
        hasMore: true,
        filter: {
          ...state.filter,
          [action.payload.key]: action.payload.value
        }
      });
    default:
      return state;
  }
}
