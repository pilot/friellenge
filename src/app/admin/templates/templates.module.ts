import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {TemplatesComponent} from './templates.component';
import {TemplatesRoutingModule} from './templates.routing';
import {FileUploaderComponent} from './components/file-uploader/file-uploader.component';
import {TemplateService} from './shared/services/template.service';
import {CreatureTemplateComponent} from './creature/creature.component';
import {TemplateCategoryService} from './shared/services/category.service';
import {TemplateEditingComponent} from './editing/editing.component';
import {TEMPLATE_CATEGORIES} from './components/categories';
import {TemplateFormComponent} from './components/template-form/template-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TemplatesRoutingModule
  ],
  declarations: [
    TemplatesComponent,
    FileUploaderComponent,
    CreatureTemplateComponent,
    TemplateEditingComponent,
    ...TEMPLATE_CATEGORIES,
    TemplateFormComponent,
  ],
  providers: [
    TemplateService,
    TemplateCategoryService
  ],
  entryComponents: [
    TemplateFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TemplatesModule {
}
