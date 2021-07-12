import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Forecast } from '../shared/forecast.model';
import { ForecastService } from '../shared/forecast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public forecastData: Forecast;
  public hourlyPm2_5: { dt: number; pm2_5: number }[] = [];
  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.forecastService.getForecastData().subscribe((forecast) => {
      console.log(forecast);
      this.forecastData = forecast;
      forecast.hourlyPm2_5.map((data) => {
        console.log(data)
        this.hourlyPm2_5.push({ dt: data?.dt, pm2_5: data?.components?.pm2_5 });
      });
      console.log(this.hourlyPm2_5)
    });
  }
}
