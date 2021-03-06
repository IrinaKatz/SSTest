import {Component, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Validator} from '../../shared/validator';
import {SocialMediaEnum} from '../../shared/socialMedia.enum';
import {OrderService} from '../../shared/order.service';
import {OrderModel} from '../../shared/order.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  order: OrderModel;
  urlForm: FormGroup;
  show = false;
  iconPath = '';
  errorMessage = '';
  priceList;

  constructor(private service: OrderService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.order = this.service.getDefaultOrder();
    this.urlForm = new FormGroup({
      urlControl: new FormControl(this.order.url, [
        Validators.required, Validator.urlPattern
      ]),
    });
    this.priceList = this.service.getPriceList();
  }

  onUrlEnter() {
    if (this.urlForm.get('urlControl').valid) {
      this.cleanErrorMessage();
      this.show = true;
      const url = this.urlForm.get('urlControl').value.toString();
      const socMediaList = ['vk', 'instagram', 'twitter'];
      for (const media of socMediaList) {
        if (this.socialMediaCheck(url, media.toLowerCase())) {
          this.show = true;
          break;
        } else {
          this.show = false;
        }
      }
    } else {
      this.show = false;
      this.setErrorMessage();
    }
  }

  private socialMediaCheck(url, media) {
    this.cleanOrder();
    if (url.includes(media + '.com')) {
      this.order.socialMedia = (SocialMediaEnum[media.toUpperCase()]);
      this.iconPath = '../../../assets/icons/' + media + '.png';

      // setOption method checks if the url is appropriate and returns either order-item or false
      if (!this.service.setOption(url, media, this.order)) {
        this.show = false;
        this.setErrorMessage();
        return false;
      }
      this.order = this.service.setOption(url, media, this.order);
      this.show = true;
      this.cleanErrorMessage();
      return true;
    }
  }

  onNewOrder() {
    this.service.addOrder(this.order);
    this.activeModal.close('Close click');
  }

  toAccelerate() {
    this.order.acceleration = !this.order.acceleration;
    if (this.order.acceleration) {
      this.order.sum *= 1.5;
    } else {
      this.order.sum /= 1.5;
    }
  }

  toEditSum() {
    this.order.sum = 0;
    for (const option of this.order.options) {
      this.order.sum += (option.totalAmount * this.service.getPriceList()[this.order.socialMedia][option.option]);
    }
  }

  private cleanErrorMessage() {
    this.errorMessage = '';
  }

  private setErrorMessage() {
    this.errorMessage = 'Некорректная ссылка';
  }

  private cleanOrder() {
    this.order.sum = 0;
    this.order.acceleration = false;
    this.order.options = [];
  }
}
