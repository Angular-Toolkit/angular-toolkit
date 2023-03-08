import {KeyStore} from "./key-store";
import {InMemoryStore} from "./stores";

describe('Key Store', () => {

  const key = 'key';
  const defaultValue = 'default';

  let store: KeyStore;

  beforeEach(() => {
    store = new KeyStore(
      key,
      defaultValue,
      new InMemoryStore(),
    );
  });

  it('should return a stored record', () => {
    const record = 'value';
    store.setValue(record);
    expect(store.value).toEqual(record);
  });

  it('should overwrite the value', () => {
    const record1 = 'value';
    const record2 = 'value-2';

    store.setValue(record1);
    store.setValue(record2);

    expect(store.value).toEqual(record2);
  });

  it('should return the default value if the record doesnt exist', () => {
    expect(store.value).toBe(defaultValue);
  });

})
