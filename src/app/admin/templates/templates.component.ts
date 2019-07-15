import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TemplateDataSource} from './shared/services/template.datasource';
import {MatDialog, MatPaginator} from '@angular/material';
import {TemplateService} from './shared/services/template.service';
import swal from 'sweetalert2';
import {tap} from 'rxjs/operators';
import {TemplateCategoryService} from './shared/services/category.service';
import {TemplateFormComponent} from './components/template-form/template-form.component';

@Component({
  selector: 'app-templates',
  templateUrl: 'templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit, AfterViewInit {
  public dataSource: TemplateDataSource;
  public displayedColumns: string[] = [];
  public categories: any[] = [];
  public category: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private templateService: TemplateService,
              public dialog: MatDialog,
              private categoryService: TemplateCategoryService) {
  }

  ngOnInit() {
    this.dataSource = new TemplateDataSource(this.templateService);
    this.dataSource.loadTamplates();

    this.displayedColumns = ['index', 'preview', 'name', 'text', 'category', 'action'];

    this.categoryService.getList()
      .subscribe(data => {
        this.categories = data;
      });
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadDataTable())
      )
      .subscribe();
  }

  public applyFilter(): void {
    if (!this.category) {
      this.loadDataTable();
    } else {
      this.loadDataTable({category: this.category});
    }
  }

  public deleteTemplate(uuid): void {
    swal({
      title: 'Are you sure?',
      type: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, cancel',
      confirmButtonClass: 'mat-raised-button mat-warn',
      cancelButtonClass: 'mat-raised-button',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.templateService.delete(uuid)
          .subscribe((data) => {
            this.loadDataTable();
          });
      }
    });
  }

  public addTemplate(): void {
    const dialogRef = this.dialog.open(TemplateFormComponent, {panelClass: 'custom-form-dialog'});

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result.template) {
          this.dataSource.loadTamplates();
        }
      });
  }

  private loadDataTable(filters: any = {}): void {
    this.dataSource.loadTamplates(filters, this.paginator.pageIndex + 1);
  }
}
