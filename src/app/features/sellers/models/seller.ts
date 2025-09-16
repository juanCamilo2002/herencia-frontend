export enum IdentificationType {
    CC = 'CC',    
    NIT = 'NIT'
}

export interface Seller {
    id: string;
    name: string;
    lastName: string;
    identificationType: IdentificationType;
    identificationNumber: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    status?: boolean;
    createdAt?: Date;
}