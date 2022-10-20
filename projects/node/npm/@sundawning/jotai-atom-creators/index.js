import { atom } from "jotai";
/**
 * atomWithRefresh creates a derived atom that can be force-refreshed, by using the update function.
 * This is helpful when you need to refresh asynchronous data after performing a side effect.
 * It can also be used to implement "pull to refresh" functionality.
 * @see https://jotai.org/docs/advanced-recipes/atom-creators#atom-with-refresh
 * @param {function} fn
 * @returns
 */
export function atomWithRefresh(fn) {
  const refreshCounter = atom(0);
  return atom(
    function (get) {
      get(refreshCounter);
      return fn(get);
    },
    function (_, set) {
      return set(refreshCounter, function (previous) {
        return previous + 1;
      });
    }
  );
}
