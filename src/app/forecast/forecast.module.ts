import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { WindDirectionPipe } from './shared/wind-direction.pipe';

const routes: Routes = [
  {
    path: 'forecast',
    component: LayoutComponent,
    // children: [{ path: '', component: LayoutComponent }],
  },
];

@NgModule({
  declarations: [LayoutComponent, WindDirectionPipe],
  imports: [RouterModule.forRoot(routes), CommonModule],
})
export class ForecastModule {}
