import { PRICE_RANGE } from '../../constants';

export const isAppLoaded = state => state.app.isLoaded;
export const isAppLoadingFailed = state => state.app.isLoadingFailed;
export const isAppLoading = state => state.app.isLoading;
export const isHotelsLoading = state => state.app.isHotelsLoading;
export const priceRange = state =>
  `${Math.round((state.app.filter.priceRange.from * PRICE_RANGE.MAX) / 100)}-${Math.round((state.app.filter.priceRange.to * PRICE_RANGE.MAX) / 100)}`;
