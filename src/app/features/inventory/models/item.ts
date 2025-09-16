export interface Item {
    id: number;
    name: string;
    type: 'producto' | 'insumo';
    category: string;
    price?: number;
}