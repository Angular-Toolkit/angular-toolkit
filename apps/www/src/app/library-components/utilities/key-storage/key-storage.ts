export class KeyStorage<T = unknown> {

  constructor(
    private _key: string,
    private _defaultValue: T,
    private _store: Storage,
  ) {
  }

  getItem(): T {
    const data = this._store.getItem(this._key);
    return data
      ? JSON.parse(data)
      : this._defaultValue;
  }

  setItem(value: T): void {
    const data = JSON.stringify(value);
    this._store.setItem(this._key, data);
  }

  clear(): void {
    this._store.removeItem(this._key);
  }

}
