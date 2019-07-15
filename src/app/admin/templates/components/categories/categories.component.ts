import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TemplateCategory} from '../../shared/model/category.model';
import {TemplateCategoryService} from '../../shared/services/category.service';
import {HelpersService} from '../../../shared/services/helpers.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesComponent implements OnInit {
  public categoriesList: TemplateCategory[] = [];

  private helpers: HelpersService;

  constructor(private categoryService: TemplateCategoryService) {
  }

  ngOnInit() {
    this.categoryService.getList()
      .subscribe(data => {
        this.categoriesList = data;
      });

    this.helpers = new HelpersService();
  }

  public addCategory($event): void {
    this.categoryService.create($event)
      .subscribe(data => {
        this.categoriesList.push(data);
      });
  }

  public removeCategory($event, uuid): void {
    this.helpers.delete()
      .subscribe((result) => {
        this.categoryService.delete(uuid)
          .subscribe(data => {
            const index = this.categoriesList.findIndex((el) => el.uuid === uuid);
            if (index > -1) {
              this.categoriesList.splice(index, 1);
            }
          });
      });
  }

  public updateCategory(title, uuid): void {
    this.categoryService.update({name: title}, uuid)
      .subscribe(data => {
        const index = this.categoriesList.findIndex((el) => el.uuid === data.uuid);
        this.categoriesList[index] = data;
      });
  }

}
