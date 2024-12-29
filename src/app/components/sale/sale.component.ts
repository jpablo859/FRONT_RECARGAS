import { Component, EventEmitter, Output } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  providers: [SaleService],
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true
})
export class SaleComponent {
  sellerName!: string;
  operators!: Observable<any[]>;
  form!: FormGroup;
  @Output() saleSuccess = new EventEmitter();

  constructor(
    private readonly saleService: SaleService,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.getAllOperators();
    this.initForm();
  }

  getAllOperators() {
    this.operators = this.saleService.getAllOperatos();
  }

  initForm() {
    this.form = this.fb.group({
      operatorId: ["", Validators.required],
      sellerId: ["", Validators.required],
      number: ["", Validators.required],
      value: ["", Validators.required],
    })
  }

  onSubmit() {
    if (!this.form.valid) return;

    console.log(this.form.valid)
    this.saleService.saveSale(this.form.value).subscribe({
      next: (response) => {
        console.log('Venta guardada con éxito:', response);
        this.form.reset();
        this.saleSuccess.emit();
      },
      error: (error) => {
        console.error('Error al guardar la venta:', error);
      }
    });
  }

  onSearchSeller(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const sellerId = this.form.get('sellerId')?.value;
      if (!sellerId) return;

      this.sellerName = '';
      this.saleService.getSeller(sellerId).subscribe({
        next: (resp) => this.sellerName = resp.name
      })
    }
  }
}
