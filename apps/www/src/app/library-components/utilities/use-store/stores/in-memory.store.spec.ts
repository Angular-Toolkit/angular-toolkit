import {InMemoryStore} from "./in-memory.store";

describe('In Memory Store', () => {

  let store: InMemoryStore;

  beforeEach(() => {
    store = new InMemoryStore();
  });

  it('should return the size of the store', () => {
    const key0 = 'key-0';
    const record0 = 'value';

    const key1 = 'key-1';
    const record1 = 'value-1';

    store.setItem(key0, record0);
    store.setItem(key1, record1);

    const size = store.length;

    expect(size).toEqual(2);
  });

  it('should store a record', () => {
    const key = 'key';
    const record = 'value';
    store.setItem(key, record);
    expect(store.length).toBe(1);
  });

  it('should return a stored record', () => {
    const key = 'key';
    const record = 'value';
    store.setItem(key, record);

    const returnedRecord = store.getItem(key);
    expect(returnedRecord).toEqual(record);
  });

  it('should respect the integrity of individual records', () => {
    const key1 = 'key';
    const record1 = 'value';

    const key2 = 'key-2';
    const record2 = 'value-2';

    store.setItem(key1, record1);
    store.setItem(key2, record2);

    const returnedRecord1 = store.getItem(key1);
    const returnedRecord2 = store.getItem(key2);

    expect(returnedRecord1).toEqual(record1);
    expect(returnedRecord2).toEqual(record2);
  });

  it('should return null if a record doesnt exist', () => {
    const key = 'key';
    const returnedRecord = store.getItem(key);
    expect(returnedRecord).toBeNull();
  });

  it('should remove records', () => {
    const key = 'key';
    const record = 'value';
    store.setItem(key, record);

    expect(store.length).toBe(1);

    store.removeItem(key);
    expect(store.length).toBe(0);
  });

  it('should return null for removed records', () => {
    const key = 'key';
    const record = 'value';
    store.setItem(key, record);

    expect(store.length).toBe(1);

    store.removeItem(key);
    const returnedRecord = store.getItem(key);
    expect(returnedRecord).toBeNull();
  });

  it('should return the zero indexed key for index 1', () => {
    const key0 = 'key-0';
    const record0 = 'value';

    const key1 = 'key-1';
    const record1 = 'value-1';

    store.setItem(key0, record0);
    store.setItem(key1, record1);

    const returnedKey = store.key(1);
    expect(returnedKey).toEqual(key1);

  });

  it('should remove all keys', () => {
    const key0 = 'key-0';
    const record0 = 'value';

    const key1 = 'key-1';
    const record1 = 'value-1';

    store.setItem(key0, record0);
    store.setItem(key1, record1);

    store.clear();
    const size = store.length;

    expect(size).toEqual(0);
  });

})
