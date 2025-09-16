import { Injectable } from '@angular/core';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  private stores: Store[] = [
    { id: 1, name: 'Tienda Principal', location: 'Centro' },
    { id: 2, name: 'Sucursal Norte', location: 'Barrio Norte' }
  ];

  getStores(): Store[] {
    return this.stores;
  }

  addStore(store: Store) {
    store.id = this.stores.length + 1;
    this.stores.push(store);
  }

  updateStore(store: Store) {
    const index = this.stores.findIndex(s => s.id === store.id);
    if (index !== -1) this.stores[index] = store;
  }

  deleteStore(id: number) {
    this.stores = this.stores.filter(s => s.id !== id);
  }
}
