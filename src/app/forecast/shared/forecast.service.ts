import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Forecast } from './forecast.model';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor(private http: HttpClient) {}

  getForecastData(): Observable<Forecast> {
    return this.http.get<Forecast>('api/v1/forecast');
  }
}
