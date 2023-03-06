import {InjectionToken} from "@angular/core";
import {KeyStorage} from "./key-storage";
import {localStorageStore} from "./stores";

export const createKeyStorage = <T = unknown>(
  key: string,
  defaultValue: T,
  store: Storage = localStorageStore,
) =>
  new InjectionToken(
    `storage-key-${key}`, {
      providedIn: 'root',
      factory: () => new KeyStorage<T>(key, defaultValue, store)
    });

