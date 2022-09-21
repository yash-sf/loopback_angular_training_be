import {repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {USER_SLUG_URL} from '../constants';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @get(USER_SLUG_URL)
  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  @get(`${USER_SLUG_URL}/{id}`)
  getUser(@param.path.number('id') id: number) {
    return this.userRepository.findById(id);
  }

  @put(`${USER_SLUG_URL}/{id}`)
  updateUser(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User),
        },
      },
    })
    user: User,
  ): Promise<void> {
    return this.userRepository.updateById(id, user);
  }

  @post(USER_SLUG_URL)
  createUser(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User),
        },
      },
    })
    user: User,
  ): Promise<User> {
    user.createdOn = new Date();
    user.modifiedOn = new Date();

    return this.userRepository.create(user);
  }

  @del(`${USER_SLUG_URL}/{id}`)
  deleteUser(@param.path.number('id') id: number) {
    return this.userRepository.deleteById(id);
  }
}
