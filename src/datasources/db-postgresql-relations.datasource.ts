import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './db-postgresql-relations.datasource.json';

export class DbPostgresqlRelationsDataSource extends juggler.DataSource {
  static dataSourceName = 'db_postgresql_relations';

  constructor(
    @inject('datasources.config.db_postgresql_relations', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
