import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: true,
    foreignKeys: {
      fk_user_role_id: {
        name: 'fk_user_role_id',
        entity: 'Role',
        entityKey: 'id',
        foreignKey: 'role_id',
      },
    },
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

  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
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
