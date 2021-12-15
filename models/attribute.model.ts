export class Attribute {
  constructor(public label: string, public value: string, public icon = 'stop') {
    this.icon = icon;
    this.label = label;
    this.value = value;
  }
}
