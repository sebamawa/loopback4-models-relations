import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Customer } from './customer.model';


// POR AHORA LAS FK SE DEFINEN MANUALMENTE
// La definicion de abajo genera conflicto al no reconocer la
// columna customerId en la tabla order. Esta columna se genera
// con el decorador @belongsTo()
// (https://github.com/strongloop/loopback-next/issues/2766)
// @model({
//   settings: {
//     "foreignKeys": {
//       "fk_order_customerId": {
//         "name": "fk_order_customerId",
//         "foreignKey": "customerId",
//         "entityKey": "id",
//         "entity": "Customer"
//       }
//     }
//   }
// })
@model()
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
  @belongsTo(
    () => Customer,
  )
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
