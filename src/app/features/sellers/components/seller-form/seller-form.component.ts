import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SellersService } from '../../services/sellers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentificationType, Seller } from '../../models/seller';

@Component({
  selector: 'app-seller-form',
  imports: [ReactiveFormsModule],
  templateUrl: './seller-form.component.html',
  styleUrl: './seller-form.component.css'
})
export class SellerFormComponent implements OnInit  {
  private fb = inject(FormBuilder);
  private sellersService = inject(SellersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  sellerId?: string;
  identificationTypes = Object.values(IdentificationType);
  
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    identificationType: ['', Validators.required],
    identificationNumber: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required]
  });

  ngOnInit(): void {
    this.sellerId = this.route.snapshot.paramMap.get('id') || undefined;

    if (this.sellerId) {
      this.sellersService.getById(this.sellerId).subscribe((seller) => {
        this.form.patchValue(seller);
      });
    }
  }

  save() {
    if (this.form.invalid) return;

    const seller: Seller = this.form.value;

    if (this.sellerId) {
      this.sellersService.update(this.sellerId, seller).subscribe(() => {
        this.router.navigate(['/dashboard/sellers']);
      });
    } else {
      this.sellersService.create(seller).subscribe(() => {
        this.router.navigate(['/dashboard/sellers']);
      });
    }
  }
 
}
