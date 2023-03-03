import {Inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {BehaviorSubject, distinctUntilChanged} from "rxjs";

import {ColorModeStore} from "./color-mode.storage";
import {ColourMode} from "./storage-mode.interface";

import type {KeyStorage} from "../../utilities/key-storage";

@Injectable({
  providedIn: 'root'
})
export class ColorModeService {
  private _mode = new BehaviorSubject<ColourMode>(this.storage.getItem());
  public asObservable = this._mode.pipe(distinctUntilChanged());
  public value = this._mode.value;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(ColorModeStore) private storage: KeyStorage<ColourMode>,
  ) {
  }

  public set(mode: ColourMode) {
    if (mode === ColourMode.LIGHT) {
      return this.setLight();
    }

    if (mode === ColourMode.DARK) {
      return this.setDark();
    }

    return this.setAuto();
  }

  private setAuto() {
    this._mode.next(ColourMode.AUTO);
    this.storage.clear();
    this.document.body.classList?.remove(ColourMode.LIGHT);
    this.document.body.classList?.remove(ColourMode.DARK);
  }

  private setDark() {
    this._mode.next(ColourMode.DARK);
    this.storage.setItem(ColourMode.DARK);
    this.document.body.classList?.remove(ColourMode.LIGHT);
    this.document.body.classList?.add(ColourMode.DARK);
  }

  private setLight() {
    this._mode.next(ColourMode.LIGHT);
    this.storage.setItem(ColourMode.LIGHT);
    this.document.body.classList?.remove(ColourMode.DARK);
    this.document.body.classList?.add(ColourMode.LIGHT);
  }
}
