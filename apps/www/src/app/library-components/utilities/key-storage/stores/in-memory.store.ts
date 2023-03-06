export class InMemoryStore implements Storage {
  private store = new Map<string, string>()

  get length(): number {
    return this.store.size;
  }

  key(index: number): string | null {
    const keys = Object.keys(Object.fromEntries(this.store));
    return keys[index] || null;
  }

  getItem(key: string): string | null {
    return this.store.get(key) || null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}

export const inMemoryStore = new InMemoryStore();
