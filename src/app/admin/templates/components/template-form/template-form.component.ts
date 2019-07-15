import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TemplateService} from '../../shared/services/template.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ComplaintDetailComponent} from '../../../complaints/components/complaint-detail/complaint-detail.component';
import {TemplateCategoryService} from '../../shared/services/category.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {
  public form: FormGroup;
  public loader: boolean;
  public categories: any[] = [];
  private attachment: any[] = [];

  constructor(private fb: FormBuilder,
              private templateService: TemplateService,
              private categoryService: TemplateCategoryService,
              private dialogRef: MatDialogRef<ComplaintDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.buildForm();
    /* get list category */
    this.categoryService.getList()
      .subscribe(data => {
        this.categories = data;
      });
  }

  public handleFile(file: any): void {
    if (file.remove) {
      this.attachment.length = 0;
    } else {
      this.attachment.push(file);
    }
  }

  public onSubmit(values): void {
    if (this.form.valid) {
      this.loader = true;
      this.templateService.create(values, this.attachment)
        .finally(() => this.loader = false)
        .subscribe(
          (data: any[]) => {
            this.dialogRef.close({template: data[0]});
            this.form.reset();
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
