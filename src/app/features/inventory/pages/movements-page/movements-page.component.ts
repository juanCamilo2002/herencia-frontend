import { Component, inject, OnInit } from '@angular/core';
import { Movement } from '../../models/movement';
import { Item } from '../../models/item';
import { Store } from '../../models/store';
import { InventoryService } from '../../services/inventory.service';
import { ItemsService } from '../../services/items.service';
import { StoresService } from '../../services/stores.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movements-page',
  imports: [DatePipe, FormsModule],
  templateUrl: './movements-page.component.html',
  styleUrl: './movements-page.component.css'
})
export class MovementsPageComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  private itemsService = inject(ItemsService);
  private storeService = inject(StoresService);

  movements: Movement[] = [];
  items: Item[] = [];
  stores: Store[] = [];

  newMovement: Movement = { id: 0, itemId: 0, storeId: 0, type: 'entrada',  quantity: 0, date: new Date() };

  ngOnInit(): void {
    this.movements = this.inventoryService.getMovements();
    this.items = this.itemsService.getItems();
    this.stores = this.storeService.getStores();
    if(this.items.length > 0 ) this.newMovement.itemId = this.items[0].id;
    if(this.stores.length > 0 ) this.newMovement.storeId = this.stores[0].id;
  }

  addMovement() {
    this.inventoryService.addMovement({ ...this.newMovement });
    this.movements = this.inventoryService.getMovements();
     this.newMovement = { id: 0, itemId: this.items[0].id, storeId: this.stores[0].id, type: 'entrada', quantity: 0, date: new Date() };
  }
  getItemName(id: number) {
    return this.items.find(i => i.id === id)?.name || 'N/A';
  }

  getStoreName(id: number) {
    return this.stores.find(s => s.id === id)?.name || 'N/A';
  }
}
