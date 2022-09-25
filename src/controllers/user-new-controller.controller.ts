import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {USER_NEW_SLUG_URL} from '../constants';
import {UserNew} from '../models';
import {UserNewRepository} from '../repositories';

export class UserNewControllerController {
  constructor(
    @repository(UserNewRepository)
    public userNewRepository: UserNewRepository,
  ) {}

  @post(USER_NEW_SLUG_URL)
  @response(200, {
    description: 'UserNew model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserNew)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserNew, {
            title: 'NewUserNew',
            exclude: ['id'],
          }),
        },
      },
    })
    userNew: Omit<UserNew, 'id'>,
  ): Promise<UserNew> {
    return this.userNewRepository.create(userNew);
  }

  @get(`${USER_NEW_SLUG_URL}/count`)
  @response(200, {
    description: 'UserNew model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(UserNew) where?: Where<UserNew>): Promise<Count> {
    return this.userNewRepository.count(where);
  }

  @get(USER_NEW_SLUG_URL)
  @response(200, {
    description: 'Array of UserNew model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserNew, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserNew) filter?: Filter<UserNew>,
  ): Promise<UserNew[]> {
    console.log('asdf');
    return this.userNewRepository.find(filter);
  }

  @patch(USER_NEW_SLUG_URL)
  @response(200, {
    description: 'UserNew PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserNew, {partial: true}),
        },
      },
    })
    userNew: UserNew,
    @param.where(UserNew) where?: Where<UserNew>,
  ): Promise<Count> {
    return this.userNewRepository.updateAll(userNew, where);
  }

  @get(`${USER_NEW_SLUG_URL}/{id}`)
  @response(200, {
    description: 'UserNew model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserNew, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserNew, {exclude: 'where'})
    filter?: FilterExcludingWhere<UserNew>,
  ): Promise<UserNew> {
    return this.userNewRepository.findById(id, filter);
  }

  @patch(`${USER_NEW_SLUG_URL}/{id}`)
  @response(204, {
    description: 'UserNew PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserNew, {partial: true}),
        },
      },
    })
    userNew: UserNew,
  ): Promise<void> {
    await this.userNewRepository.updateById(id, userNew);
  }

  @put(`${USER_NEW_SLUG_URL}/{id}`)
  @response(204, {
    description: 'UserNew PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userNew: UserNew,
  ): Promise<void> {
    console.log(userNew);
    return this.userNewRepository.replaceById(id, userNew);
  }

  @del(`${USER_NEW_SLUG_URL}/{id}`)
  @response(204, {
    description: 'UserNew DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    return this.userNewRepository.deleteById(id);
  }
}
