export class UserFilter {
  type: number;
  name: string;

  constructor() {
    this.type = null;
    this.name = '';
  }

  getParams(): Object {
    const params = {};
    if (this.type !== null) {
      params['type'] = this.type;
    }

    if (this.name) {
      params['name'] = this.name.trim();
    }
    return params;
  }

  cleanParam(type: string) {
    delete this[type];
  }

}
