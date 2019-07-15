import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// Import Material Modules
import {MATERIAL_MODULES} from './shared-material';
import {NAV_DROPDOWN_DIRECTIVES} from './directives/nav-dropdown';
import {APP_PIPES} from './pipes';
import {CHALLENGES_COMPONENTS} from './components';
import {NgxCarouselModule} from 'ngx-carousel';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCarouselModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ...CHALLENGES_COMPONENTS,
    ...APP_PIPES,
    ...MATERIAL_MODULES,
    ...NAV_DROPDOWN_DIRECTIVES
  ],
  declarations: [
    ...CHALLENGES_COMPONENTS,
    ...APP_PIPES,
    ...NAV_DROPDOWN_DIRECTIVES,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
