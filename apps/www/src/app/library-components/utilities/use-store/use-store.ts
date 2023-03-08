import {InjectionToken} from "@angular/core";
import {KeyStore} from "./key-store";
import {localStorageStore} from "./stores";

export const useStore = <T = unknown>(
  key: string,
  defaultValue: T,
  store: Storage = localStorageStore,
) =>
  new InjectionToken(
    `store-${key}`, {
      providedIn: 'root',
      factory: () => new KeyStore<T>(key, defaultValue, store)
    });

