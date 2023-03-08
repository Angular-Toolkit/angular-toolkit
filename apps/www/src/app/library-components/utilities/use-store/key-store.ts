export class KeyStore<T = unknown> {

  constructor(
    private _key: string,
    private _defaultValue: T,
    private _store: Storage,
  ) {
  }

  get value(): T {
    const data = this._store.getItem(this._key);
    return data
      ? JSON.parse(data)
      : this._defaultValue;
  }

  setValue(value: T): void {
    const data = JSON.stringify(value);
    this._store.setItem(this._key, data);
  }

}
