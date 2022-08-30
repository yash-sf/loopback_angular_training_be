import {inject} from '@loopback/core';
import {get, Request, RestBindings} from '@loopback/rest';

export class DummyController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/dummy')
  hello() {
    return {
      message: 'asdfasf',
    };
  }
}
