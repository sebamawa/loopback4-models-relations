import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Customer } from './customer.model';

@model({ settings: {} })
export class Order extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id: number;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // customerId: number;

  @belongsTo(() => Customer)
  customerId: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
