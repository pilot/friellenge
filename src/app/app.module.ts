import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// Import External Modules
import {FacebookModule} from 'ngx-facebook';
// Import Routing Module
import {AppRoutingModule} from './app.routing';
// Import Internal modules
import {SharedModule} from './shared/shared.module';
// Import Services
import {CORE_PROVIDERS} from './core';
import {HttpService} from './core/services/http.service';

import {AppComponent} from './app.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    FacebookModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpService,
      multi: true
    },
    ...CORE_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
