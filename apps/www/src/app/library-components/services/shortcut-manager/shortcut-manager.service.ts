import {DOCUMENT} from "@angular/common";
import {Inject, Injectable} from "@angular/core";
import {EventManager} from "@angular/platform-browser";
import {Observable, throwError} from "rxjs";
import {Keys} from "./keys";

type KeyboardShortcutListener = Observable<{ event: KeyboardEvent; name: string; }>;
type KeyboardShortcutListeners = Array<KeyboardShortcutListener>;

type ShortcutKey = Keys | string;
type ShortcutKeys = Array<ShortcutKey>;

type KeyboardShortcuts = Array<KeyboardShortcut>;
type KeyboardShortcut = {
  name: string;
  keys: ShortcutKeys;
  element?: HTMLElement;
};

@Injectable({
  providedIn: 'root'
})
export class ShortcutManagerService {
  private _shortcuts = new Map<string, KeyboardShortcutListener>();

  constructor(
    private eventManager: EventManager,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  registerShortcut({name, keys, element}: KeyboardShortcut): KeyboardShortcutListener {
    const key = this.concatKeys(keys);
    const targetElement = element ?? this._document.body;
    const shortcut = this.createShortcut(name, key, targetElement);

    this._shortcuts.set(name, shortcut);

    return shortcut;
  }

  registerShortcuts(shortcuts: KeyboardShortcuts): KeyboardShortcutListeners {
    return shortcuts.map(shortcut => this.registerShortcut(shortcut));
  }

  getShortcut(name: string): KeyboardShortcutListener {
    const shortcut = this._shortcuts.get(name);
    const errorMessage = `No shortcut exists for ${name}, check the spelling or register one`;

    return shortcut ?? throwError(() => new Error(errorMessage));
  }

  unregisterShortcut(name: string): boolean {
    return this._shortcuts.delete(name);
  }

  unregisterAllShortcuts(): void {
    this._shortcuts.clear();
  }

  private createShortcut(name: string, key: string, element: HTMLElement): KeyboardShortcutListener {
    return new Observable(subscriber => {
      const handler = (event: KeyboardEvent) => {
        event.preventDefault()
        subscriber.next({event, name});
      };

      const listener = this.eventManager.addEventListener(element, key, handler);

      return () => listener();
    })
  }

  private concatKeys(keys: ShortcutKeys): string {
    return 'keydown.' + keys.join('.');
  }
}
