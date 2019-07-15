import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Output() create = new EventEmitter();
  public title = '';

  constructor() {
  }

  ngOnInit() {
  }

  public onSubmit(): void {
    if (this.title !== '') {
      this.create.emit({name: this.title.trim()});
      this.title = '';
    }
  }

}
