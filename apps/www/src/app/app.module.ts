import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {MastheadComponent} from "./components/masthead";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
    MastheadComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
