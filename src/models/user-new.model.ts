import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Role} from './role.model';

@model({
  settings: {
    strict: true,
    postgresql: {schema: 'public', table: 'users_new'},
  },
})
export class UserNew extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  website?: string;

  @belongsTo(() => Role, {name: 'role'})
  role_id: number;

  [prop: string]: any;

  constructor(data?: Partial<UserNew>) {
    super(data);
  }
}

export interface UserNewRelations {
  // describe navigational properties here
}

export type UserNewWithRelations = UserNew & UserNewRelations;
