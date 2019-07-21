import { Entity, model, property, hasMany } from '@loopback/repository';
import { Order } from './order.model';

@model({ settings: {} })
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Order, { keyTo: 'customerId' })
  orders?: Order[];


  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
