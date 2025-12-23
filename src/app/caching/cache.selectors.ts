import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CacheState } from './cache.reducer';

export const selectCacheState = createFeatureSelector<CacheState>('cache');

export const selectCachedList = createSelector(
    selectCacheState,
    (state: CacheState, props: { key: string }) => {
      return {
        list: state.lists[props.key],
        isDataCached: !!state.lists[props.key]
      };
    }
  );
