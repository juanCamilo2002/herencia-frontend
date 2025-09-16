import { Component, inject, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-items-page',
  imports: [FormsModule],
  templateUrl: './items-page.component.html',
  styleUrl: './items-page.component.css'
})
export class ItemsPageComponent implements OnInit {
  private itemsService = inject(ItemsService);

  items: Item[] = [];
  newItem: Item = { id: 0, name: '', type: 'producto', category: '', price: 0 };
  editingItem: Item | null = null;

  ngOnInit(): void {
    this.items = this.itemsService.getItems();
  }

  addItem() {
    this.newItem.id = this.items.length + 1;
    this.items.push({ ...this.newItem });
    this.newItem = { id: 0, name: '', type: 'producto', category: '', price: 0 };
  }

  editItem(item: Item) {
    this.editingItem = { ...item };
  }

  updateItem() {
    if (this.editingItem) {
      const index = this.items.findIndex(i => i.id === this.editingItem!.id);
      if (index !== -1) this.items[index] = this.editingItem;
      this.editingItem = null;
    }
  }

  deleteItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
  }
}
