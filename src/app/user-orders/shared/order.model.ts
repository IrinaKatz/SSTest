import {OrderTypeEnum} from './orderType.enum';
import {SocialMediaEnum} from './socialMedia.enum';
import {OrderParamModel} from './orderParam.model';

export class OrderModel {

  id: number;
  userId: number;
  url: string;
  imagePath: string;
  header: string;
  type: OrderTypeEnum;
  options: OrderParamModel[];
  socialMedia: SocialMediaEnum | string;
  acceleration: boolean;
  sum: number;
  constructor(id: number,
              userId: number,
              url: string,
              imagePath: string,
              header: string,
              type: OrderTypeEnum,
              options: OrderParamModel[],
              socialMedia: SocialMediaEnum | string,
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
