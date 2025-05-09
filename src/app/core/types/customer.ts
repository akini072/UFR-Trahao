import { Address } from './address';

export interface Customer {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    cpf: string;
    address: Address
}
