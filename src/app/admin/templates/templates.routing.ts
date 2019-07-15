import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TemplatesComponent} from './templates.component';
import {CreatureTemplateComponent} from './creature/creature.component';

export const routes: Routes = [
  {
    path: 'templates',
    component: TemplatesComponent
  },
  {
    path: 'template/create',
    component: CreatureTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule {
}
