import {KeyStorage} from "./key-storage";
import {InMemoryStore} from "./stores";

describe('Key Storage', () => {

  const key = 'key';
  const defaultValue = 'default';

  let store: KeyStorage;

  beforeEach(() => {
    store = new KeyStorage(
      key,
      defaultValue,
      new InMemoryStore(),
    );
  });

  it('should return a stored record', () => {
    const record = 'value';
    store.setItem(record);

    const returnedRecord = store.getItem();
    expect(returnedRecord).toEqual(record);
  });

  it('should overwrite the value', () => {
    const record1 = 'value';
    const record2 = 'value-2';

    store.setItem(record1);
    store.setItem(record2);

    const returnedRecord = store.getItem();
    expect(returnedRecord).toEqual(record2);
  });

  it('should return the default value if the record doesnt exist', () => {
    const returnedRecord = store.getItem();
    expect(returnedRecord).toBe(defaultValue);
  });

  it('should return the default value for removed records', () => {
    const record = 'value';
    store.setItem(record);
    store.removeItem();

    const returnedRecord = store.getItem();
    expect(returnedRecord).toEqual(defaultValue);
  });

})
