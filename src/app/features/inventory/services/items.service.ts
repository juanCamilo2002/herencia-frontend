import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
   private items: Item[] = [
      { id: 1, name: 'Laptop', type: 'producto', category: 'Electrónica', price: 2500 },
      { id: 2, name: 'Mouse', type: 'producto', category: 'Accesorios', price: 25 },
      { id: 3, name: 'Pantalla LCD', type: 'insumo', category: 'Repuestos' }
    ];

    getItems(): Item[]{
      return this.items;
    }
}
