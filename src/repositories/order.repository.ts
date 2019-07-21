import { DefaultCrudRepository, BelongsToAccessor, repository } from '@loopback/repository';
import { Order, OrderRelations, Customer } from '../models';
import { DbPostgresqlRelationsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/context';//'@loopback/core';
import { CustomerRepository } from './customer.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
  > {
  public readonly customer: BelongsToAccessor<
    Customer,
    typeof Order.prototype.id
  >;
  constructor(
    @inject('datasources.db_postgresql_relations') dataSource: DbPostgresqlRelationsDataSource,
    @repository.getter('CustomerRepository')
    customerRepositoryGetter: Getter<CustomerRepository>,
  ) {
    super(Order, dataSource);
    this.customer = this.createBelongsToAccessorFor(
      'customer',
      customerRepositoryGetter,
    );
  }
}
