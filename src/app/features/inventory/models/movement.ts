export interface Movement {
    id: number;
    itemId: number;
    storeId: number;
    type: 'entrada' | 'salida' | 'venta';
    quantity: number;
    date: Date;
}