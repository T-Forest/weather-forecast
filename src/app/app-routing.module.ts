import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForecastModule } from './forecast/forecast.module';

const routes: Routes = [
  { path: '', redirectTo: 'forecast', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ForecastModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
