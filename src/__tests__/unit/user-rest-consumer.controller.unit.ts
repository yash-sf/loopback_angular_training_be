import {
  createStubInstance,
  expect,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {UserNewControllerController} from '../../controllers';
import {UserNew} from '../../models';
import {UserNewRepository} from '../../repositories';

describe('User Rest Consumer (Unit)', () => {
  let repo: StubbedInstanceWithSinonAccessor<UserNewRepository>;
  beforeEach(givenStubbedRepo);
  it('creates a new user', async () => {
    const user = new UserNew({
      id: 1,
      name: 'ABC',
      role_id: 1,
    });
    repo.stubs.create.resolves(user);
    let controller = new UserNewControllerController(repo);
    const response = await controller.create(user);
    expect(response).to.containEql(user);
  });

  it('gets all the users', async () => {
    const users = [
      new UserNew({id: 2, name: 'Get1', role_id: 2}),
      new UserNew({id: 3, name: 'Get2', role_id: 2}),
    ];
    repo.stubs.find.resolves(users);
    let controller = new UserNewControllerController(repo);
    const response = await controller.find();
    expect(response).to.eql(users);
  });

  it('gets a specific user', async () => {
    const user = new UserNew({id: 4, name: 'Get3', role_id: 1});
    repo.stubs.findById.resolves(user);
    let controller = new UserNewControllerController(repo);
    const response = await controller.findById(4);
    expect(response).to.containEql(user);
  });

  it('updates a specific user', async () => {
    const user = new UserNew({id: 5, name: 'Update', role_id: 1});
    repo.stubs.replaceById.resolves();
    let controller = new UserNewControllerController(repo);
    const response = await controller.replaceById(5, user);
    expect(response).to.eql(undefined);
  });

  it('deletes a specific user', async () => {
    repo.stubs.deleteById.resolves();
    let controller = new UserNewControllerController(repo);
    const response = await controller.deleteById(6);
    expect(response).to.eql(undefined);
  });

  function givenStubbedRepo() {
    repo = createStubInstance(UserNewRepository);
  }
});
