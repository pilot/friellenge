import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  public file: any;
  @Output() fileChange = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  public onFileChange(fileInput) {
    const reader = new FileReader();
    if (fileInput.files.length) {
      const file = fileInput.files[0];
      reader.onload = () => {
        this.file = reader.result;
      };
      reader.readAsDataURL(file);
      this.fileChange.next(file);
    }
  }

  public removeImage(): void {
    this.file = '';
    this.fileChange.emit({remove: true});
  }

}
