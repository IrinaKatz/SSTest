import {OrderType} from './orderType';
import {SocialMedia} from './socialMedia';
import {OrderParam} from './orderParam';

export interface Order {
  id: number;
  userId: number;
  url: string;
  imagePath: string;
  header: string;
  type: OrderType;
  options: OrderParam[];
  socialMedia: SocialMedia;
  acceleration: boolean;
  sum: number;
}
