import {ApiConfig} from '../../../../core/configs/api.config';

export class TemplateModel {
  uuid: string;
  name: string;
  category: any;
  description: string;
  text: string;
  media_content: any[] = [];

  constructor(data?: any) {
    if (data) {
      this.uuid = data.uuid;
      this.name = data.name;
      this.category = data.category;
      this.description = data.description;
      this.text = data.text;
      this.media_content = data.media_content;
    }
  }

  public imagePath(): string {
    let imgPath = '';
    if (this.media_content.length > 0) {
      imgPath = this.media_content[0].preview;
    } else {
      imgPath = ApiConfig.defaultImage;
    }
    return imgPath;
  }
}
