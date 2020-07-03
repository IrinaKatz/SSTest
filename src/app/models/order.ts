import {OrderType} from './orderType';
import {SocialMedia} from './socialMedia';
import {OrderParam} from './orderParam';

export class Order {

  id: number;
  userId: number;
  url: string;
  imagePath: string;
  header: string;
  type: OrderType;
  options: OrderParam[];
  socialMedia: SocialMedia | string;
  acceleration: boolean;
  sum: number;
  constructor(id: number,
              userId: number,
              url: string,
              imagePath: string,
              header: string,
              type: OrderType,
              options: OrderParam[],
              socialMedia: SocialMedia | string,
              acceleration: boolean,
              sum: number) {
    this.id = id;
    this.userId = userId;
    this.url = url;
    this.imagePath = imagePath;
    this.header = header;
    this.type = type;
    this.options = options;
    this.socialMedia = socialMedia;
    this.acceleration = acceleration;
    this.sum = sum;
  }

}
