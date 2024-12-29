import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SaleComponent } from "./components/sale/sale.component";
import { SummaryComponent } from './components/summary/summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SaleComponent, SummaryComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'FRONT_RECARGAS';
  isRefreshData = false;

  loadData() {
    this.isRefreshData = !this.isRefreshData;
  }
}
