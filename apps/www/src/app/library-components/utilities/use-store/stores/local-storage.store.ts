import {inMemoryStore} from "./in-memory.store";

/**
 * LocalStorageStore
 * Falls back to in-memory storage if local storage isn't available
 */
export class LocalStorageStore implements Storage {

  private _store = globalThis.localStorage || inMemoryStore;

  get length(): number {
    return this._store.length
  }

  key(index: number): string | null {
    return this._store.key(index);
  }

  getItem(key: string): string | null {
    return this._store.getItem(key);
  }

  setItem(key: string, value: string): void {
    return this._store.setItem(key, value);
  }

  removeItem(key: string): void {
    return this._store.removeItem(key);
  }

  clear(): void {
    return this._store.clear();
  }
}

export const localStorageStore = new LocalStorageStore();
