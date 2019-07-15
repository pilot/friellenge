import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TemplateCategory} from '../../../shared/model/category.model';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {
  @Input() item: TemplateCategory;
  @Output() remove = new EventEmitter();
  @Output() update = new EventEmitter();

  public editing = false;
  public title = '';

  constructor() {
  }

  ngOnInit() {
  }

  // TODO: create focus directive
  public editTitle(): void {
    this.editing = true;
    this.title = this.item.name;
  }

  public saveTitle(): void {
    if (this.editing && this.title !== '') {
      const title: string = this.title.trim();
      if (title !== this.item.name) {
        this.update.emit(title);
      }
      this.editing = false;
    }
  }

}
