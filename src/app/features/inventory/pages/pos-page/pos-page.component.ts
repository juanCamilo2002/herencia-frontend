import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '../../models/store';
import { StoresService } from '../../services/stores.service';

@Component({
  selector: 'app-pos-page',
  imports: [ FormsModule],
  templateUrl: './pos-page.component.html',
  styleUrl: './pos-page.component.css'
})
export class PosPageComponent implements OnInit {
  private storesService = inject(StoresService);

  stores: Store[] = [];
  newStore: Store = { id: 0, name: '', location: '' };
  editingStore: Store | null = null;

  ngOnInit(): void {
    this.stores = this.storesService.getStores();
  }

  addStore() {
    this.storesService.addStore({ ...this.newStore });
    this.newStore = { id: 0, name: '', location: '' };
    this.stores = this.storesService.getStores();
  }

  editStore(store: Store) {
    this.editingStore = { ...store };
  }

  updateStore() {
    if (this.editingStore) {
      this.storesService.updateStore(this.editingStore);
      this.editingStore = null;
      this.stores = this.storesService.getStores();
    }
  }

  deleteStore(id: number) {
    this.storesService.deleteStore(id);
    this.stores = this.storesService.getStores();
  }

}
