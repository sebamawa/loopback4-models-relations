// import { get } from "https";
// import { param } from "@loopback/rest";
import { repository, Filter } from "@loopback/repository";
import { CustomerRepository } from "../repositories";
import { Order } from "../models";
import { Customer } from "../models";
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class CustomerOrdersController {
  constructor(
    @repository(CustomerRepository)
    public customerRepository: CustomerRepository,
  ) { }


  @get('/customers/{customerId}/orders', {
    responses: {
      '200': {
        description: 'Array of Customer model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Customer } },
          },
        },
      },
    },
  })
  async findOrders(
    @param.path.string('customerId') customerId: number,
    @param.query.string('filter') filter?: Filter<Order>,
  ): Promise<any[]> {
    const orders = await this.customerRepository.orders(customerId).find(filter);
    return orders;
  }
}





