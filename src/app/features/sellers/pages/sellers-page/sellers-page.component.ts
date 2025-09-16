import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellersService } from '../../services/sellers.service';
import { Seller } from '../../models/seller';

@Component({
  selector: 'app-sellers-page',
  imports: [FormsModule],
  templateUrl: './sellers-page.component.html',
  styleUrl: './sellers-page.component.css'
})
export class SellersPageComponent implements OnInit {
  private sellersService = inject(SellersService);

  sellers: Seller[] = [];
  newSeller: Partial<Seller> = {}

  ngOnInit(): void {
    
  }
}
