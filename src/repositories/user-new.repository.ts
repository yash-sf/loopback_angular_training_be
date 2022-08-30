import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {UserNew, UserNewRelations} from '../models';

export class UserNewRepository extends DefaultCrudRepository<
  UserNew,
  typeof UserNew.prototype.role_id,
  UserNewRelations
> {
  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource,
  ) {
    super(UserNew, dataSource);
  }
}
