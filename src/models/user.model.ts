import {Entity, model, property} from '@loopback/repository';

enum UserRole {
  SuperAdmin,
  Admin,
  Subscriber,
}

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
  })
  middleName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'number',
    required: true,
  })
  role: UserRole;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  createdOn?: Date;

  @property({
    type: 'string',
  })
  modifiedOn?: Date;

  constructor(data?: User) {
    super(data);
  }
}
