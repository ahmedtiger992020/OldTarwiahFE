import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { setCachedList } from './cache.actions';

@Injectable()
export class CacheEffects {

  updateCachedList$ = createEffect(() => this.actions$.pipe(
    ofType(setCachedList),
    mergeMap(({ list }) => {
      try {
        localStorage.setItem('cachedList', JSON.stringify(list));
        return of({ type: 'NO_ACTION' }); // No action needed after updating cache
      } catch (error) {
        console.error('Error updating cached list:', error);
        return of({ type: 'CACHE_ERROR' }); // Handle cache update error
      }
    })
  ));

  constructor(private actions$: Actions) {}
}
