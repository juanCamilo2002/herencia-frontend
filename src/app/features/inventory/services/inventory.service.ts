import { Injectable } from '@angular/core';
import { Movement } from '../models/movement';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private movements: Movement[] = [];

  getMovements(): Movement[] {
    return this.movements;
  }

  addMovement(movement: Movement) {
    movement.id = this.movements.length + 1;
    movement.date = new Date();
    this.movements.push(movement);
  }

  getStock(itemId: number, storeId: number): number {
    return this.movements
      .filter(m => m.itemId === itemId && m.storeId === storeId)
      .reduce((total, m) => {
        if (m.type === 'entrada') return total + m.quantity;
        if (m.type === 'salida' || m.type === 'venta') return total - m.quantity;
        return total;

      }, 0)
  }
}
