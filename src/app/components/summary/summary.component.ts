import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  imports: [HttpClientModule, CommonModule],
  providers: [SaleService],
  standalone: true
})
export class SummaryComponent {
  summary!: Observable<any[]>;
  @Input() saleSuccess: any;

  constructor(
    private readonly saleService: SaleService,
  ) { }

  ngOnInit() {
    this.setSummary();
  }

  setSummary() {
    this.summary = this.saleService.getSummary();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setSummary();
  }
}
