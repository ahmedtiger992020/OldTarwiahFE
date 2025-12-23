import { createReducer, on } from '@ngrx/store';
import * as CacheActions from './cache.actions';

export interface CacheState {
  lists: { [key: string]: any[] };
}

export const initialState: CacheState = {
  lists: {}
};

export const cacheReducer = createReducer(
  initialState,
  on(CacheActions.setCachedList, (state, { key, list }) => ({
    ...state,
    lists: {
      ...state.lists,
      [key]: list
    }
  }))
);
