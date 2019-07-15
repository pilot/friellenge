import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TemplateCategory} from '../shared/model/category.model';
import {TemplateCategoryService} from '../shared/services/category.service';
import {TemplateService} from '../shared/services/template.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-creature',
  templateUrl: './creature.component.html',
  styleUrls: ['./creature.component.scss']
})
export class CreatureTemplateComponent implements OnInit {
  public form: FormGroup;
  public loader: boolean;
  public categoriesList: TemplateCategory[] = [];
  private attachment: any[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private templateService: TemplateService,
              private categoryService: TemplateCategoryService) {
  }

  ngOnInit() {
    this.buildForm();
    // init template categories list
    this.categoryService.getList()
      .subscribe(data => this.categoriesList = data);
  }

  public handleFile(file): void {
    this.attachment.push(file);
  }

  public onSubmit(values): void {
    if (this.form.valid) {
      this.loader = true;
      this.templateService.create(values, this.attachment)
        .finally(() => this.loader = false)
        .subscribe(
          (data) => {
            this.form.reset();
            this.router.navigate(['dashboard/templates']);
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

}
