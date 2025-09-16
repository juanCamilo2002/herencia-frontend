import { Component, inject, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { Store } from '../../models/store';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoresService } from '../../services/stores.service';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-inventory-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-page.component.html',
  styleUrl: './inventory-page.component.css'
})
export class InventoryPageComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  private storesService = inject(StoresService);
  private itemsService = inject(ItemsService);

  items: Item[] = [];
  stores: Store[] = [];
  selectedStoreId!: number;

  ngOnInit(): void {
    this.items = this.itemsService.getItems();
    this.stores = this.storesService.getStores();
    this.selectedStoreId = this.stores[0].id; 
  }

  getStock(itemId: number) {
    return this.inventoryService.getStock(itemId, this.selectedStoreId);
  }
  
}
