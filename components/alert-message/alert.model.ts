export class AlertMessage {
  // this img variable depends on the name images in assets
  img: string;
  height: dimentions;
  message: string;
  constructor(
    img: string,
    height: dimentions = 'small',
    message: string
    ) {
      this.img = img;
      this.height =  height;
      this.message = message;
  }
}

type dimentions = 'small' | 'medium' | 'large' | 'extra-large';
