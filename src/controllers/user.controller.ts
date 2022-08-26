import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @get('/users')
  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  @get('/users/{id}')
  getUser(@param.path.number('id') id: number) {
    return this.userRepository.findById(id);
  }

  @put('/users/{id}')
  updateUser(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            exclude: ['id'],
          }),
        },
      },
    })
    user: User,
  ): Promise<void> {
    return this.userRepository.updateById(id, user);
  }

  @post('/users')
  createUser(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            exclude: ['id'],
          }),
        },
      },
    })
    user: User,
  ): Promise<User> {
    user.createdOn = new Date();
    user.modifiedOn = new Date();
    console.log(user);
    return this.userRepository.create(user);
  }
}
