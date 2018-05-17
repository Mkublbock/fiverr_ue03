import {Component, OnInit, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DiagramService} from '../../../services/diagram.service';
import {AvailableDevice} from '../../../models/device.available';
import {HttpClient} from '@angular/common/http';
import {map, filter} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detail-continuous',
  templateUrl: './detail-continuous.component.html'
})
export class DetailContinuousComponent {

  devices: any[];
  device;
  index: string;

  data: any[] = [
    {
      "name": "Temparatur",
      "series": [

      ]
    }
  ];

  constructor(private diagramServce: DiagramService, private http: HttpClient, private router: Router) {
    this.devices = diagramServce.devices;
    this.index = this.router.url.slice(this.router.url.length - 1, this.router.url.length);
    this.device = this.devices[parseInt(this.index, 10) - 1];
  }

  addData(value: number) {
    //insert date at "Temparatur"
    this.data[0].series.push({"name": "Temparatur"+value, "value": value});
    this.data=[...this.data];
  }
}
