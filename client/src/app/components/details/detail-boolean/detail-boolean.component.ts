import { Component, OnInit, Inject } from '@angular/core';
import { DeviceService } from '../../../services/device.service';
import { Observable } from 'rxjs/observable';
import { DiagramService } from '../../../services/diagram.service';
import { AvailableDevice } from '../../../models/device.available';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authservice';

@Component({
  selector: 'app-detail-boolean',
  templateUrl: './detail-boolean.component.html'
})
export class DetailBooleanComponent {

  timeStamp;
  devices: any[];
  device: AvailableDevice;
  index: string;
  data: Object[];

  trueCount = 0;
  falseCount = 0;

  textareaRow = '';
  lastCheckBoxValue = false;

  constructor(private diagramServce: DiagramService, private router: Router, authService: AuthService) {
    this.devices = diagramServce.devices;
    this.index = this.router.url.slice(this.router.url.length - 1, this.router.url.length);
    this.device = this.devices[parseInt(this.index, 10) - 1];
    console.log(this.device);
  }

  addData(checkBoxValue: boolean) {
    this.timeStamp = new Date();
    const time = this.timeStamp.getDate() + '.' + this.timeStamp.getMonth() + '.' + this.timeStamp.getFullYear()
      + ', ' + this.timeStamp.getHours() + ':' + this.timeStamp.getMinutes() + ':' + this.timeStamp.getSeconds() + ': ';
    if (checkBoxValue && !this.lastCheckBoxValue) {
      this.trueCount++;
      this.textareaRow += time + '' + 'Aus -> An\n';
      this.lastCheckBoxValue = true;
    } else {
      if (!checkBoxValue && this.lastCheckBoxValue) {
        this.textareaRow += time + '' + 'An -> Aus\n';
        this.falseCount++;
        this.lastCheckBoxValue = false;
      }
    }

    this.data = [{ 'name': 'true', 'value': this.trueCount }, { 'name': 'false', 'value': this.falseCount }];
  }
}
