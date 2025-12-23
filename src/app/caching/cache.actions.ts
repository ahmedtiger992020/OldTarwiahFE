import { createAction, props } from '@ngrx/store';

export const setCachedList = createAction(
  '[Cache] Set Cached List',
  props<{ key: string; list: any[] }>()
);
