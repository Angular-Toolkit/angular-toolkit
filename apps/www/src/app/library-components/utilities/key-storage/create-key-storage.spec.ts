import {TestBed} from "@angular/core/testing";
import {createKeyStorage} from "./create-key-storage";
import {KeyStorage} from "./key-storage";
import {InMemoryStore, LocalStorageStore} from "./stores";

describe('Create Key Storage', () => {

  const key = 'key';
  const defaultValue = 'default-value';

  it('should return an Angular injection token', () => {
    const token = createKeyStorage(key, defaultValue);
    const store = TestBed.inject(token);
    expect(store).toBeInstanceOf(KeyStorage);
  });

  it('should configure the key storage correctly', () => {
    const token = createKeyStorage(key, defaultValue);
    const store = TestBed.inject(token);
    expect(store['_key']).toBe(key)
    expect(store['_defaultValue']).toBe(defaultValue)
  });

  it('should configure the key storage to use the localStorageStore by default', () => {
    const token = createKeyStorage(key, defaultValue);
    const store = TestBed.inject(token);
    expect(store['_store']).toBeInstanceOf(LocalStorageStore)
  });

  it('should configure the key storage to use the localStorage Store', () => {
    const token = createKeyStorage(key, defaultValue, );
    const store = TestBed.inject(token);
    expect(store['_store']).toBeInstanceOf(LocalStorageStore)
  });

  it('should configure the key storage to use the InMemory Store', () => {
    const token = createKeyStorage(key, defaultValue, new InMemoryStore());
    const store = TestBed.inject(token);
    expect(store['_store']).toBeInstanceOf(InMemoryStore)
  });

})
