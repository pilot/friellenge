export class TemplateCategory {
  uuid: string;
  name: string;

  constructor(data: any) {
    this.uuid = data.uuid;
    this.name = data.name;
  }
}
