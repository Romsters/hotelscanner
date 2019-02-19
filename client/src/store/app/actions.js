import 'fetch';
import { isAppLoaded, isHotelsLoading, priceRange } from './selectors';

export const APP_LOADED = 'APP_LOADED';
export const APP_LOADING_FAILED = 'APP_LOADING_FAILED';
export const HOTELS_LOADED = 'HOTELS_LOADED';
export const HOTELS_LOADING_FAILED = 'HOTELS_LOADING_FAILED';
export const HOTELS_LOADING_STARTED = 'HOTELS_LOADING_STARTED';
export const FILTER_CHANGED = 'FILTER_CHANGED';

export const load = () => async (dispatch, getState) => {
  if (isAppLoaded(getState())) return;
  // for future init data loading
  try {
    dispatch({ type: APP_LOADED });
  } catch (e) {
    dispatch({ type: APP_LOADING_FAILED, reason: e });
  }
};

export const apply = (key, value) => dispatch => {
  if (key === 'priceRange') {
    dispatch({ type: FILTER_CHANGED, payload: { key, value: { from: value[0], to: value[1] } } });
    return;
  }
  dispatch({ type: FILTER_CHANGED, payload: { key, value } });
};

export const search = () => async (dispatch, getState) => {
  const state = getState();
  if (isHotelsLoading(state) || !state.app.hasMore) return;
  dispatch({ type: HOTELS_LOADING_STARTED });
  try {
    const filter = state.app.filter;
    const page = state.app.page;
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/hotels?page=${page}&title=${filter.title}&priceRange=${priceRange(state)}&sort=${filter.sort}`
    );
    const json = await response.json();
    if (json.error) {
      dispatch({ type: HOTELS_LOADING_FAILED, reason: json.error });
      return;
    }
    dispatch({ type: HOTELS_LOADED, payload: json.data });
  } catch (e) {
    dispatch({ type: HOTELS_LOADING_FAILED, reason: e });
  }
};
