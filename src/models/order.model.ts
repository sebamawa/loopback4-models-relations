import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Customer } from './customer.model';

@model({
  settings: {
    "foreignKeys": {
      "customerId": {
        "name": "user_fkey",
        "foreignKey": "id",
        "entityKey": "id",
        "entity": "Customer"
      }
    }
  }
})
export class Order extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id: number;

  // la relacion belongsTo genera esta propiedad (FK a customer)
  // @property({
  //   type: 'number',
  //   required: true,
  // })
  // customerId: number;

  @property({
    type: 'date',
    format: 'date',
    required: true
  })
  date: Date;

  // Each order belongs to a user, identified by its id (customerId)
  @belongsTo(() => Customer)
  customerId: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;


  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
