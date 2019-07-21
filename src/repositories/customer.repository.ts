import { DefaultCrudRepository, HasManyRepository, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { Customer, CustomerRelations, Order } from '../models';
import { DbPostgresqlRelationsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/context';//'@loopback/core';
import { OrderRepository } from '.';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
  > {
  public readonly orders: HasManyRepositoryFactory<
    Order,
    typeof Customer.prototype.id
  >;
  constructor(
    @inject('datasources.db_postgresql_relations') dataSource: DbPostgresqlRelationsDataSource,
    @repository.getter('OrderRepository')
    getOrderRepository: Getter<OrderRepository>,
  ) {
    super(Customer, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor(
      'orders',
      getOrderRepository,
    );
  }
}
