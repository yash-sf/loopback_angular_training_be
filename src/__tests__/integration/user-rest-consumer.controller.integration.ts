import {expect} from '@loopback/testlab';
import {UserNewControllerController} from '../../controllers';
import {PostgresqlDataSource} from '../../datasources';
import {UserNew} from '../../models';
import {UserNewRepository} from '../../repositories';

describe('User Rest Consumer (Integration)', () => {
  let repo: UserNewRepository;
  const createdIds: number[] = [];
  beforeEach(givenStubbedRepo);
  it('creates a new user', async () => {
    const user = new UserNew({
      name: 'ABC',
      role_id: 1,
    });
    let controller = new UserNewControllerController(repo);
    const response = await controller.create(user);
    user.id = response.id;
    createdIds.push(response.id);
    expect(response).to.containEql(user);
  });

  it('gets all the users', async () => {
    const user = new UserNew({
      name: 'DEF',
      role_id: 1,
    });
    let controller = new UserNewControllerController(repo);
    await controller.create(user);
    const response = await controller.find();
    createdIds.push(response[1].id);
    expect(response).to.instanceOf(Array);
  });

  it('gets a specific user', async () => {
    let controller = new UserNewControllerController(repo);
    const response = await controller.findById(createdIds[0]);
    expect(response.name).to.eql('ABC');
  });

  it('updates a specific user', async () => {
    let controller = new UserNewControllerController(repo);
    console.log(createdIds);
    const response = await controller.findById(createdIds[0]);
    response.name = 'Updated name';
    await controller.replaceById(createdIds[0], response);
    const updatedUser = await controller.findById(createdIds[0]);
    expect(updatedUser.name).to.eql('Updated name');
  });

  it('deletes a specific user', async () => {
    let controller = new UserNewControllerController(repo);
    await controller.deleteById(createdIds[0]);
    await controller.findById(createdIds[0]).catch(e => {
      console.log(e);
      expect(e).to.instanceOf(Error);
    });
  });

  // should be called when all the tests are run in a singluar setup.ts file
  function cleaupData() {
    const dataSource = new PostgresqlDataSource();
    if (dataSource.connector && dataSource.connector.execute) {
      const query = `DELETE from users_new where id in ( ${createdIds.join(
        ',',
      )} )`;
      console.log(query);
      return dataSource.connector
        .execute(query)
        .then(r => console.log(r))
        .catch(e => console.log(e));
    }
    return true;
  }

  function givenStubbedRepo() {
    const dataSource = new PostgresqlDataSource();
    repo = new UserNewRepository(dataSource);
  }
});
