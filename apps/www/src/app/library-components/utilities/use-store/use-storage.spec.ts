import {TestBed} from "@angular/core/testing";
import {useStore} from "./use-store";
import {KeyStore} from "./key-store";
import {InMemoryStore, LocalStorageStore} from "./stores";

describe('useStore', () => {

  const key = 'key';
  const defaultValue = 'default-value';

  it('should return an Angular injection token', () => {
    const token = useStore(key, defaultValue);
    const store = TestBed.inject(token);
    expect(store).toBeInstanceOf(KeyStore);
  });

  it('should configure the key storage correctly', () => {
    const token = useStore(key, defaultValue);
    const store = TestBed.inject(token);
    expect(store['_key']).toBe(key)
    expect(store['_defaultValue']).toBe(defaultValue)
  });

  it('should configure the key storage to use the localStorageStore by default', () => {
    const token = useStore(key, defaultValue);
    const store = TestBed.inject(token);
    expect(store['_store']).toBeInstanceOf(LocalStorageStore)
  });

  it('should configure the key storage to use the localStorage Store', () => {
    const token = useStore(key, defaultValue, new LocalStorageStore());
    const store = TestBed.inject(token);
    expect(store['_store']).toBeInstanceOf(LocalStorageStore)
  });

  it('should configure the key storage to use the InMemory Store', () => {
    const token = useStore(key, defaultValue, new InMemoryStore());
    const store = TestBed.inject(token);
    expect(store['_store']).toBeInstanceOf(InMemoryStore)
  });

})
