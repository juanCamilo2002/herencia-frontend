import { Component, inject, OnInit } from '@angular/core';
import { Seller } from '../../models/seller';
import { SellersService } from '../../services/sellers.service';
import { RouterLink } from '@angular/router';
import { DatatableComponent } from "../../../../shared/components/datatable/datatable.component";

@Component({
  selector: 'app-sellers-list',
  imports: [RouterLink, DatatableComponent],
  templateUrl: './sellers-list.component.html',
  styleUrl: './sellers-list.component.css'
})
export class SellersListComponent implements OnInit {
  private sellersService = inject(SellersService);

  sellers: Seller[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadSellers();
  }

  loadSellers() {
    this.sellersService.getAll().subscribe({
      next: (data) => {
        this.sellers = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando vendedores', err);
        this.loading = false
      }
    });
  }

  deleteSeller(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este vendedor?')) {
      this.sellersService.delete(id).subscribe(() => {
        this.sellers = this.sellers.filter(seller => seller.id !== id);
      });
    }
  }

  onRowClick(seller: Seller) {
    console.log('Fila clickeada:', seller);
  }
}
